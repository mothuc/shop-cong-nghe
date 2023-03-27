import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAddress,
  updateEmail,
  updateFullname,
  updateOrderId,
  updatePhone,
  updateTotalCost,
} from "../reducers/formSlice";

function InputInfor({ handleInput }) {
  const dispatch = useDispatch();
  const totalCost = useSelector((state) => state.cart.totalCost);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    dispatch(updateOrderId(`#${Math.floor(Math.random() * 1000000)}`));
    dispatch(updateFullname(form.elements.fullname.value));
    dispatch(updatePhone(form.elements.phone.value));
    dispatch(updateEmail(form.elements.email.value));
    dispatch(updateAddress(form.elements.address.value));
    dispatch(updateAddress(form.elements.address.value));
    dispatch(updateTotalCost(totalCost));
    handleInput(1);
  }

  return (
    <div>
      <h3>Thông tin khách hàng</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3 ">
          <input
            type="text"
            className="form-control"
            placeholder="Họ và tên (bắt buộc)"
            name="fullname"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Số điện thoại (bắt buộc)"
            name="phone"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Email (Vui lòng điền email để nhận hóa đơn VAT)"
            name="email"
          />
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Địa chỉ" name="address" />
        </div>
        <button type="submit" className="btn bg-danger w-100">
          Tiếp tục
        </button>
      </form>
    </div>
  );
}

export default InputInfor;
