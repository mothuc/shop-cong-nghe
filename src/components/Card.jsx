import currency from "currency.js";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cartSlice";

function Card({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div>
      {product && (
        <div className="col position-relative">
          <div className="card card-content rounded-4">
            <div className="card-header">
              <img src={product.image} className="card-img-top p-4" alt="..." />
            </div>
            <div className="card-body">
              <h3 className="card-title text-center">{product.name}</h3>
              <div className="d-flex gap-3 py-3 align-item-center">
                <p className="card-price-sale">
                  {currency(product.salePrice, {
                    symbol: "",
                    separator: ".",
                    precision: 0,
                    pattern: `# !`,
                  }).format()}
                </p>
                <p className="card-price" style={{ fontSize: "14px" }}>
                  {currency(product.price, {
                    symbol: "",
                    separator: ".",
                    precision: 0,
                    pattern: `# !`,
                  }).format()}
                </p>
              </div>
              <button
                className="btn btn-danger position-absolute"
                style={{ left: 0, bottom: 0, width: "100%" }}
                onClick={() => handleAddToCart(product)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
