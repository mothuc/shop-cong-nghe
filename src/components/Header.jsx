import React from "react";

function Header() {
  return (
    <header className="Header_nav">
      <div className="Header__logo">
        <a href="/home">
          <img
            className="Header__img"
            src="https://brademar.com/wp-content/uploads/2022/10/CellphoneS-Logo-PNG-1.png"
            alt=""
          />
        </a>
      </div>

      <div className="Header__search m-0 ">
        <div className="search__input">
          <input className="input_1" type="text" placeholder="Search" />
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="Header__cart m-0">
          <div className="position-relative">
            <div className="cart__content">
              <i className="fa-solid fa-cart-shopping"></i>{" "}
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              1<span className="visually-hidden"></span>
            </span>
          </div>
          <p className="giohang m-0">Gio hang</p>
        </div>

        <button className="Header__login">
          <div className="login__content">
            <i className="fa-regular fa-user"></i> ĐĂNG NHẬP
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
