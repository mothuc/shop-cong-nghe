import currency from "currency.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../reducers/cartSlice";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../firebase";

function CartPage() {
  const dispatch = useDispatch();

  const reduxStore = useSelector((state) => state);
  const cartProducts = reduxStore.cart.products;
  const totalCost = useSelector((state) => state.cart.totalCost);

  const handleMinusItem = (product) => {
    const productId = product.id;
    dispatch(updateQuantity({ productId, quantity: -1 }));
  };

  const handlePlusItem = (product) => {
    const productId = product.id;
    dispatch(updateQuantity({ productId, quantity: +1 }));
  };

  const handleRemoveItem = (product) => {
    const productId = product.id;
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="container p-4 mb-4">
      <h2>Giỏ hàng</h2>
      {cartProducts.map((product) => (
        <div key={uuidv4()}>
          <div className="row mt-4">
            <img className="col-3" width={"100%"} src={product.image} alt="" />
            <div className="col">
              <p>{product.name}</p>
              <div className="d-flex gap-4">
                <p className="card-price-sale">
                  {currency(product.salePrice, {
                    symbol: "",
                    separator: ".",
                    precision: 0,
                    pattern: `# !`,
                  }).format()}
                </p>
                <p className="card-price">
                  {currency(product.price, {
                    symbol: "",
                    separator: ".",
                    precision: 0,
                    pattern: `# !`,
                  }).format()}
                </p>
              </div>
            </div>
            <div className="col-3">
              <div className="row  gx-2">
                <button
                  onClick={() => handleMinusItem(product)}
                  className="minus col btn bg-light btn-sm"
                >
                  -
                </button>
                <input
                  className="input col d-block w-100 text-center"
                  type="text "
                  readOnly="readOnly"
                  value={product.quantity}
                />
                <button
                  onClick={() => handlePlusItem(product)}
                  className="plus col btn bg-light btn-sm"
                >
                  +
                </button>
                <p className="col cursor-pointer" onClick={() => handleRemoveItem(product)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}
      {totalCost !== 0 && (
        <p>
          Tổng tiền:{" "}
          {currency(totalCost, {
            symbol: "",
            separator: ".",
            precision: 0,
            pattern: `# !`,
          }).format()}
        </p>
      )}
      <Link className="link" to={!auth.currentUser ? "/register" : "/payment"}>
        <button className="btn bg-danger float-end">Đặt hàng</button>
      </Link>
    </div>
  );
}

export default CartPage;
