import axios from "axios";
import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

function Header() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [dropdownDisplay, setDropdownDisplay] = useState(false);
  const handleInput = (e) => {
    setKeyword(e.target.value);
    setDropdownDisplay(true);
  };

  const keywordDebounce = useDebounce(keyword, 500);

  useEffect(() => {
    let url = `http://api-smartphone-nu.vercel.app/products?q=${keywordDebounce}`;
    if (keywordDebounce !== "") {
      axios
        .get(url)
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    }
  }, [keywordDebounce]);

  const selecProductSearch = (e) => {
    console.log(e.target.id);
  };

  const clickOut = () => {
    setDropdownDisplay(false);
    setKeyword("");
  };
  return (
    <div>
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

        <div className="Header__search">
          <div className="search__input form-group">
            <input
              value={keyword}
              className="input_1  form-control"
              onChange={handleInput}
              type="search"
              placeholder="Search"
              onBlur={clickOut}
            />
            {products && (
              <div
                className={`dropdown-menu p-2 ${dropdownDisplay ? "d-block" : ""}`}
                id="search-dropdown"
              >
                {products.length === 0 ? "Không tìm thấy sản phẩm" : ""}
                {products.map((p) => (
                  <div
                    onClick={selecProductSearch}
                    id={p.id}
                    key={`${p.id}${p.name}`}
                    className="dropdown-item cursor-pointer"
                    href="#"
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            )}
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
    </div>
  );
}

export default Header;
