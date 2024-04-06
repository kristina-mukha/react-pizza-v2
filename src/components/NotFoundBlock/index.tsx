import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span className={styles.emoji}>😕</span>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.text}>
        К сожалению, данная страница отсутствует в нашем интернет-магазине
      </p>
      <Link className={styles.link} to="/">
        Вернуться на главную
      </Link>
    </div>
  );
};
