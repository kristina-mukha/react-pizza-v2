import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCart } from "../../redux/cart/selectors";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const location = useLocation();
  const isMounted = React.useRef(false);

  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className={styles.root}>
      <Link to="/">
        <div className={styles.info}>
          <div className={styles.logo}>
            <svg
              width="100"
              height="100"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3_387)">
                <path
                  d="M25 0C16.1476 0 7.8674 2.44614 0.795044 6.69685L25 47.0574L49.205 6.69685C42.1326 2.44614 33.8524 0 25 0Z"
                  fill="#D9A460"
                />
                <path
                  d="M25 6.8032C17.4275 6.8032 10.3443 8.89575 4.29443 12.5319L17.6417 34.788C17.6412 34.8061 17.6389 34.824 17.6389 34.8423V48.1687C17.6389 49.1803 18.4588 50 19.4701 50C20.4815 50 21.3014 49.1801 21.3014 48.1687V40.8906L24.9999 47.0574L33.3742 33.0937V38.6866C33.3742 39.6979 34.1941 40.5177 35.2054 40.5177C36.2169 40.5177 37.0367 39.6978 37.0367 38.6866V26.9865L38.7151 24.1878V29.3942C38.7151 30.4056 39.535 31.2253 40.5463 31.2253C41.5578 31.2253 42.3776 30.4054 42.3776 29.3942V18.0805L45.7051 12.5319C39.6557 8.89575 32.5726 6.8032 25 6.8032Z"
                  fill="#F2D383"
                />
                <path
                  d="M25 6.8032C17.4275 6.8032 10.3443 8.89575 4.29443 12.5319L5.3061 14.2188C11.0605 10.7604 17.7974 8.77009 25 8.77009C32.2026 8.77009 38.9396 10.7604 44.694 14.2187L45.7056 12.5317C39.6557 8.89575 32.5726 6.8032 25 6.8032Z"
                  fill="#B3874F"
                />
                <path
                  d="M30.921 26.2857C27.1585 26.2857 24.1083 29.336 24.1083 33.0986C24.1083 36.3345 26.3654 39.0415 29.3906 39.7362L36.0552 28.6232C34.8063 27.1915 32.97 26.2857 30.921 26.2857Z"
                  fill="#E94F3D"
                />
                <path
                  d="M15.0047 16.7162C12.392 16.7162 10.1239 18.1876 8.98096 20.3466L14.9746 30.3404C14.9847 30.3406 14.9947 30.3412 15.0047 30.3412C18.7673 30.3412 21.8175 27.2913 21.8175 23.5289C21.8175 19.7664 18.7673 16.7162 15.0047 16.7162Z"
                  fill="#E94F3D"
                />
                <path
                  d="M31.4118 23.8564C35.1744 23.8564 38.2245 20.8063 38.2245 17.0438C38.2245 13.2812 35.1744 10.2311 31.4118 10.2311C27.6493 10.2311 24.5991 13.2812 24.5991 17.0438C24.5991 20.8063 27.6493 23.8564 31.4118 23.8564Z"
                  fill="#E94F3D"
                />
                <path
                  d="M21.0339 6.99775C16.4014 7.45114 12 8.68975 7.96301 10.5789C8.95145 13.1218 11.4211 14.925 14.3133 14.925C18.0759 14.925 21.1262 11.875 21.1262 8.11266C21.1262 7.73273 21.0936 7.3605 21.0339 6.99775Z"
                  fill="#E94F3D"
                />
                <path
                  d="M21.0339 6.99775C16.4014 7.45114 11.9999 8.68975 7.96301 10.5789C8.20484 11.2002 8.5347 11.7776 8.93803 12.2951C12.693 10.5568 16.7765 9.40805 21.0705 8.97004C21.1059 8.68893 21.1262 8.40325 21.1262 8.11266C21.1262 7.73273 21.0936 7.3605 21.0339 6.99775Z"
                  fill="#C24232"
                />
                <path
                  d="M4.30195 7.53459C4.66341 7.53459 4.95643 7.24157 4.95643 6.8801C4.95643 6.51864 4.66341 6.22562 4.30195 6.22562C3.94048 6.22562 3.64746 6.51864 3.64746 6.8801C3.64746 7.24157 3.94048 7.53459 4.30195 7.53459Z"
                  fill="#B3874F"
                />
                <path
                  d="M9.63556 8.84356C9.99703 8.84356 10.29 8.55054 10.29 8.18908C10.29 7.82761 9.99703 7.53459 9.63556 7.53459C9.2741 7.53459 8.98108 7.82761 8.98108 8.18908C8.98108 8.55054 9.2741 8.84356 9.63556 8.84356Z"
                  fill="#B3874F"
                />
                <path
                  d="M15.3992 4.38505C15.7607 4.38505 16.0537 4.09202 16.0537 3.73056C16.0537 3.3691 15.7607 3.07608 15.3992 3.07608C15.0378 3.07608 14.7448 3.3691 14.7448 3.73056C14.7448 4.09202 15.0378 4.38505 15.3992 4.38505Z"
                  fill="#B3874F"
                />
                <path
                  d="M22.873 5.69402C23.2345 5.69402 23.5275 5.40099 23.5275 5.03953C23.5275 4.67807 23.2345 4.38505 22.873 4.38505C22.5115 4.38505 22.2185 4.67807 22.2185 5.03953C22.2185 5.40099 22.5115 5.69402 22.873 5.69402Z"
                  fill="#B3874F"
                />
                <path
                  d="M30.7363 3.07608C31.0977 3.07608 31.3908 2.78306 31.3908 2.42159C31.3908 2.06013 31.0977 1.76711 30.7363 1.76711C30.3748 1.76711 30.0818 2.06013 30.0818 2.42159C30.0818 2.78306 30.3748 3.07608 30.7363 3.07608Z"
                  fill="#B3874F"
                />
                <path
                  d="M34.5511 6.88011C34.9126 6.88011 35.2056 6.58708 35.2056 6.22562C35.2056 5.86416 34.9126 5.57114 34.5511 5.57114C34.1896 5.57114 33.8966 5.86416 33.8966 6.22562C33.8966 6.58708 34.1896 6.88011 34.5511 6.88011Z"
                  fill="#B3874F"
                />
                <path
                  d="M46.3601 8.11217C46.7215 8.11217 47.0145 7.81915 47.0145 7.45769C47.0145 7.09623 46.7215 6.8032 46.3601 6.8032C45.9986 6.8032 45.7056 7.09623 45.7056 7.45769C45.7056 7.81915 45.9986 8.11217 46.3601 8.11217Z"
                  fill="#B3874F"
                />
                <path
                  d="M40.8713 6.8032C41.2327 6.8032 41.5258 6.51018 41.5258 6.14872C41.5258 5.78726 41.2327 5.49423 40.8713 5.49423C40.5098 5.49423 40.2168 5.78726 40.2168 6.14872C40.2168 6.51018 40.5098 6.8032 40.8713 6.8032Z"
                  fill="#B3874F"
                />
              </g>
              <defs>
                <clipPath id="clip0_3_387">
                  <rect width="100" height="100" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={styles.text}>
            <h1 className={styles.title}>React Pizza</h1>
            <span className={styles.description}>
              Самая вкусная пицца на свете!
            </span>
          </div>
        </div>
      </Link>

      {location.pathname !== "/cart" && (
        <Link to="cart">
          <div className={styles.user} title="Перейти в корзину">
            <div className={styles.cost}>{totalPrice} RUB</div>
            <div className={styles.items}>
              <div className={styles.cart}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className={styles.number}>{totalCount}</div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
