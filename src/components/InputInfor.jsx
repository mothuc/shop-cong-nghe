import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../reducers/cartSlice";
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

    dispatch(clearCart());
  }

  return (
    <div>
      <h3>Thông tin khách hàng</h3>
      <form id="form-1" className="needs-validation" onSubmit={handleSubmit}>
        <div className="input-group  form-group mb-3 ">
          <input
            type="text"
            className="form-control"
            placeholder="Họ và tên (bắt buộc)"
            name="fullname"
            id="fullname"
            required
          />
          <div className="invalid-feedback">Vui lòng nhập đầy đủ họ tên</div>
        </div>
        <div className="input-group  form-group mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Số điện thoại (bắt buộc)"
            name="phone"
            id="phone"
            required
          />
          <div className="invalid-feedback">Vui lòng nhập số điện thoại</div>
        </div>
        <div className="input-group  form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Email (Vui lòng điền email để nhận hóa đơn VAT)"
            name="email"
            id="email"
            required
          />
          <div className="invalid-feedback">Vui lòng nhập email</div>
        </div>
        <div className="input-group  form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Địa chỉ"
            id="address"
            name="address"
            required
          />
          <div className="invalid-feedback">Vui lòng nhập địa chỉ</div>
        </div>
        <button type="submit" className="btn form-submit bg-danger w-100">
          Tiếp tục
        </button>
      </form>
    </div>
  );
}

export default InputInfor;
