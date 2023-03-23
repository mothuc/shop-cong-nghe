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
              <div className="d-flex justify-content-around align-item-center p-2">
                <p className="card-price-sale">{product.salePrice}</p>
                <p className="card-price">{product.price}</p>
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
