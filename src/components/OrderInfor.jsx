import currency from "currency.js";
import React from "react";
import { useNavigate } from "react-router-dom";

function OrderInfor({ orderInfor }) {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <div>
      <button onClick={handleClick} className="btn bg-">
        Quay lại
      </button>
      <div className="rounded-4 p-4" style={{ backgroundColor: "#d4edda" }}>
        <h4 className="fw-bold ">ĐẶT HÀNG THÀNH CÔNG</h4>
        <p>
          Mã đơn hàng : <span className="fw-bold">{orderInfor.orderId}</span>{" "}
        </p>
        <p>
          Người đặt: <span className="fw-bold">{orderInfor.fullname}</span>
        </p>
        <p>
          Số điện thoại: <span className="fw-bold">{orderInfor.phone}</span>
        </p>
        <p>
          Email: <span className="fw-bold">{orderInfor.email}</span>
        </p>
        <p>
          Địa chỉ nhận hàng: <span className="fw-bold">{orderInfor.address}</span>
        </p>
        <p>
          Tổng tiền:{" "}
          <span className="fw-bold">
            {currency(orderInfor.totalCost, {
              symbol: "",
              separator: ".",
              precision: 0,
              pattern: `# !`,
            }).format()}
          </span>
        </p>
      </div>
    </div>
  );
}

export default OrderInfor;
