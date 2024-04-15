import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";

import { selectFilter } from "../redux/filter/selectors";
import {
  setCategoryId,
  setPageCurrent,
  setFilters,
} from "../redux/filter/slice";
import { SearchPizzaParams } from "../redux/pizzas/types";
import { selectPizzaData } from "../redux/pizzas/selectors";
import { fetchPizzas } from "../redux/pizzas/asyncActions";
import { useAppDispatch } from "../redux/store";

import { sortTypes } from "../components/Sort";

import {
  Categories,
  Search,
  Sort,
  PizzaBlock,
  Skeleton,
  Pagination,
} from "../components";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortTypeObj, pageCurrent, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setPageCurrent(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sortTypeObj.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortTypeObj.sortProperty.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        category,
        order,
        sortBy,
        search,
        pageCurrent: String(pageCurrent),
      })
    );

    window.scrollTo(0, 0);
  };

  // 1. Вшивание параметров фильтрации и/или сортировки в адресную строку при их изменении
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        pageCurrent,
        categoryId,
        sortBy: sortTypeObj.sortProperty,
      });

      navigate(`?${queryString}`);

      console.log(
        "Параметры фильтрации и/или сортировки были:\n 1. изменены\n 2. вшиты в адресную строку\nТекущий статус: параметры готовы к парсингу и сохранению в Редакс"
      );
    }
    isMounted.current = true;
  }, [pageCurrent, categoryId, sortTypeObj.sortProperty]);

  // 2. Парсинг заданных параметров фильтрации и/или сортировки и сохранение их в Редакс
  React.useEffect(() => {
    if (window.location.hash === "#/") {
      window.location.hash.substring(3);
    } else if (window.location.hash) {
      const params = qs.parse(
        window.location.hash.substring(3)
      ) as unknown as SearchPizzaParams;

      const sort = sortTypes.find(
        (sortType) => sortType.sortProperty === params.sortBy
      );

      console.log(
        "Произошёл парсинг заданных параметров фильтрации и/или сортировки"
      );
      console.log("PARAMS: \n", params);

      console.log(
        "Параметры после парсинга: \n",
        "pageCurrent = ",
        params.pageCurrent,
        "\n",
        "category =",
        params.category,
        "\n",
        "categoryId =",
        categoryId,
        "\n",
        "sort =",
        sort,
        "\n",
        "sortTypeObj =",
        sortTypeObj
      );

      if (sort) {
        dispatch(
          setFilters({
            pageCurrent: Number(params.pageCurrent),
            categoryId: Number(params.category),

            // sortTypeObj,
            // --- @ts-ignore
            sortTypeObj: sort,
            searchValue: params.search,
          })
        );

        dispatch(setCategoryId(Number(params.category)));
      }
      console.log(
        "Произошло сохранение заданных параметров фильтрации и/или сортировки в Редакс"
      );
      console.log(
        "После сохранения параметров в Редакс новый sort теперь такой:\n",
        sort,
        "с типом значения",
        typeof sort,
        "\n а новый sortTypeObj теперь такой:",
        sortTypeObj,
        "(тип значения: ",
        typeof sortTypeObj,
        ")",
        "\n a categoryId теперь такой:\n",
        categoryId,
        "с типом значения",
        typeof categoryId
      );

      isSearch.current = true;
    }
  }, []);

  // 3. Получение пицц
  React.useEffect(() => {
    if (!isSearch.current) {
      console.log(
        "Запрашиваем пиццы по заданным параметрам фильтрации и/или сортировки: \n",
        "pageCurrent = ",
        pageCurrent,
        "\n",
        "categoryId =",
        categoryId,
        "\n",
        "sortTypeObj.sortProperty =",
        sortTypeObj.sortProperty,
        "\n",
        "searchValue =",
        searchValue
      );
      getPizzas();
    }

    isSearch.current = false;
  }, [pageCurrent, categoryId, sortTypeObj.sortProperty, searchValue]);

  const skeletonBlocks = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzaBlocks = items.map((obj: any) =>
    status === "loading" ? (
      <Skeleton />
    ) : (
      <PizzaBlock {...obj} key={obj.imgUrl} />
    )
  );

  return (
    <>
      <div className="layout">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(id: any) => onChangeCategory(id)}
        />
        <div className="layout1">
          <Sort value={sortTypeObj} />
          <Search />
        </div>
      </div>
      <Pagination pageCurrent={pageCurrent} onChangePage={onChangePage} />

      {status === "loading" && (
        <div style={{ margin: "30px 0 30px" }}>Загружаем пиццы...</div>
      )}

      {status === "error" ? (
        <div>
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="layout2">
          {status === "loading" ? skeletonBlocks : pizzaBlocks}
        </div>
      )}

      <Pagination pageCurrent={pageCurrent} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
