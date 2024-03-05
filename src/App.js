import React from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import "./scss/app.scss";

function App() {
  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    fetch("https://65e7602b53d564627a8eab8e.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
      });
  }, []);

  return (
    <div className="App">
      <div className="layoutMain">
        <Header />
        <div className="layout1">
          <Categories />
          <Sort />
        </div>
        <div className="layout2">
          {pizzas.map((obj) => (
            <PizzaBlock {...obj} key={obj.imgUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
