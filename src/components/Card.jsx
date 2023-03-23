import currency from "currency.js";
import React from "react";

function Card({ product }) {
  return (
    <div>
      {product.image && (
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
              <a
                href="/detail"
                className="btn btn-danger position-absolute"
                style={{ left: 0, bottom: 0, width: "100%" }}
              >
                Thêm vào giỏ hàng
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
