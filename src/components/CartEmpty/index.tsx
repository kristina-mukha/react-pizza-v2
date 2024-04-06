import React from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from "../../assets/img/empty-cart.png";

import styles from "./CartEmpty.module.scss";

export const CartEmpty: React.FC = () => (
  <div className={styles.root}>
    <h2>
      Корзина пустая <span>😕</span>
    </h2>
    <p>
      Вероятней всего, вы не заказывали ещё пиццу.
      <br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Вернуться назад</span>
    </Link>
  </div>
);
