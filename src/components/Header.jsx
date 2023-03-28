import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchProducts } from "../apis/searchProducts";
import useDebounce from "../hooks/useDebounce";
import { v4 as uuidv4 } from "uuid";

function Header() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [dropdownDisplay, setDropdownDisplay] = useState(false);
  const dropDownRef = useRef();
  const cart = useSelector((state) => state.cart.products);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleInput = (e) => {
    setKeyword(e.target.value);
    setDropdownDisplay(true);
  };

  const keywordDebounce = useDebounce(keyword, 500);

  useEffect(() => {
    (async () => {
      try {
        const data = await searchProducts.search(keywordDebounce);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [keywordDebounce]);

  const selecProductSearch = (e) => {
    console.log(e.target.id);
  };

  const clickOut = (e) => {
    const { target } = e;
    if (!dropDownRef.current.contains(target)) {
      setDropdownDisplay(false);
      document.getElementById("input-search").value = "";
    }
  };

  return (
    <div className="row">
      <div className="col">
        <div className="sticky-top">
          <header className="Header_nav">
            <Link to="/" className="link">
              <img
                className="Header__img"
                src="https://brademar.com/wp-content/uploads/2022/10/CellphoneS-Logo-PNG-1.png"
                alt=""
              />
            </Link>

            <div className="Header__search">
              <div className="search__input form-group">
                <input
                  id="input-search"
                  className="input_1  form-control"
                  onChange={handleInput}
                  type="search"
                  placeholder="Search"
                  onBlur={clickOut}
                />
                {products && (
                  <div
                    ref={dropDownRef}
                    className={`dropdown-menu p-2 ${dropdownDisplay ? "d-block" : ""}`}
                    id="search-dropdown"
                  >
                    {products.length === 0 ? "Không tìm thấy sản phẩm" : ""}
                    {products.map((p) => (
                      <div
                        onClick={selecProductSearch}
                        id={p.id}
                        key={uuidv4()}
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
              <Link to="/cart" className="link">
                <div className="Header__cart m-0">
                  <div className="position-relative">
                    <div className="cart__content text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bag-check"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                    </div>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalQuantity}
                      <span className="visually-hidden"></span>
                    </span>
                  </div>
                  <span className="giohang m-0">Gio hang</span>
                </div>
              </Link>

              <Link to="/login" className="link">
                <button className="Header__login">
                  <div className="login__content text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>{" "}
                    ĐĂNG NHẬP
                  </div>
                </button>
              </Link>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Header;
