import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Sort as SortType, SortPropertyEnum } from "../../redux/filter/types";
import { setSortTypeObj } from "../../redux/filter/slice";

import styles from "./Sort.module.scss";

type SortTypesItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

type SortPopupProps = {
  value: SortType;
};

export const sortTypes: SortTypesItem[] = [
  { name: "популярности ⬇", sortProperty: SortPropertyEnum.RATING_DESC },
  {
    name: "популярности ⬆",
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
  { name: "цене ⬆", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "цене ⬇", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "алфавиту ⬆", sortProperty: SortPropertyEnum.TITLE_ASC },
  { name: "алфавиту ⬇", sortProperty: SortPropertyEnum.TITLE_DESC },
];

export const Sort: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickSort = (obj: SortTypesItem) => {
    dispatch(setSortTypeObj(obj));
    setOpen(false);
  };

  // Closing of Sort pop-up when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;

      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    // Works when Sort component is mounted (+)
    document.body.addEventListener("click", handleClickOutside);

    // Works when Sort component is UNmounted (-)
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles.root} ref={sortRef}>
      <div className={styles.indicator}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" />
        </svg>
      </div>
      <div className={styles.text}>
        <span>сортировать по</span>
      </div>
      <div className={styles.options}>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
        {open && (
          <ul className={styles.list}>
            {sortTypes.map((sortType, index) => (
              <li
                className={`${styles.item} ${
                  value.sortProperty === sortType.sortProperty
                    ? `${styles.active}`
                    : ""
                }`}
                key={index}
                onClick={() => onClickSort(sortType)}
              >
                {sortType.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});
