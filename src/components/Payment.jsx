import { updateProfile } from "firebase/auth";
import { Timestamp, doc, setDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { clearCart } from "../reducers/cartSlice";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = cart.products;
  const totalCost = cart.totalCost;
  const timestamp = Timestamp.fromDate(new Date()).seconds;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = auth.currentUser;
  console.log(user);

  const onSubmit = async (data) => {
    const fullName = data.fullname;
    const email = data.email;
    const phoneNumber = data.phoneNumber;
    const address = data.address;
    console.log(data);

    try {
      //Update user information
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        phoneNumber: phoneNumber,
      });
      console.log("Update user information done!");

      //Update userInfor database
      const userInforRef = doc(db, "users", user.uid);
      await updateDoc(userInforRef, {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      });

      console.log("Update user on database done!");
      //Create orders
      await setDoc(doc(db, "orders", user.uid), {
        orderId: timestamp,
        products,
        totalCost,
      });

      dispatch(clearCart());
      navigate("/payment/successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-4">
      <h4 className="fw-bolder">Thông tin đặt hàng</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 mt-3">
          <label className="float-start" htmlFor="fullname">
            Họ và tên:
          </label>
          <input
            value={user?.displayName}
            {...register("fullname", { required: true })}
            type="text"
            className="form-control"
            id="fullname"
            placeholder="Vui lòng nhập họ và tên"
            name="fullname"
          />
          {errors.fullname && <p className="p-1  text-danger">Vui lòng nhập họ và tên</p>}
        </div>

        <div className="mb-3 mt-3">
          <label className="float-start" htmlFor="email">
            Email:
          </label>
          <input
            value={user.email}
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
            type="text"
            className="form-control"
            id="email"
            placeholder="Vui lòng nhập email"
            name="email"
          />
          {errors.email && <p className="p-1 text-danger">Email không được để trống</p>}
        </div>

        <div className="mb-3">
          <label className="float-start" htmlFor="phoneNumber">
            Số điện thoại:
          </label>
          <input
            {...register("phoneNumber", {
              required: true,
              maxLength: 10,
            })}
            type="text"
            className="form-control"
            id="phoneNumber"
            placeholder="Vui lòng nhập số điện thoại"
            name="phoneNumber"
          />
          {errors.password && <p className="p-1 text-danger">Số điện thoại không hợp lệ</p>}
        </div>

        <div className="mb-3">
          <label className="float-start" htmlFor="address">
            Địa chỉ:
          </label>
          <input
            {...register("address", {
              required: true,
            })}
            type="text"
            className="form-control"
            id="address"
            placeholder="Vui lòng nhập địa chỉ"
            name="address"
          />
          {errors.address && <p className="p-1 text-danger">Vui lòng nhập địa chỉ</p>}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-danger">
            Đặt hàng
          </button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
