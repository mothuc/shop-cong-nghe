import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../firebase";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = auth.currentUser;

  const onSubmit = (data) => {
    const fullName = data.fullname;
    const email = data.email;
    const phoneNumber = data.phoneNumber;
    const address = data.address;
    console.log(data);
    updateProfile(auth.currentUser, {
      phoneNumber: phoneNumber,
    })
      .then(() => {
        console.log("Update user infomation successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    const userData = doc(db, "users", user.uid);

    updateDoc(userData, {
      userInfor: {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      },
    });
  };
  return (
    <div>
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
};

export default ContactForm;
