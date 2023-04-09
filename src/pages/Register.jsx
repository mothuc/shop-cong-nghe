import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../reducers/authSlice";
import { doc, setDoc } from "firebase/firestore";

import store from "../reducers/store";

function Register() {
  const storeRedux = store.getState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorEmail, setErrorEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(storeRedux);

  const onSubmit = (data) => {
    const email = data.email;
    const fullname = data.fullname;

    //Register user account with email and password
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.displayName = fullname;
        console.log(user);

        updateProfile(user, {
          displayName: fullname,
        });

        dispatch(login({ user }));

        //Create user on firestore
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email,
          fullname,
        });

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          setErrorEmail("Tài khoản đã tồn tại.");
        }
      });
  };
  return (
    <div className="container mt-3 p-4">
      <div className="text-center">
        <h2>Đăng ký</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 mt-3">
            <label htmlFor="fullname">Họ và tên:</label>
            <input
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
            <label htmlFor="email">Email:</label>
            <input
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
            {errorEmail && <p className="p-1 text-danger">{errorEmail}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password:</label>
            <input
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Mật khẩu tối thiểu 8 ký tự",
                },
              })}
              type="password"
              className="form-control"
              id="password"
              placeholder="Vui lòng nhập mật khẩu"
              name="password"
            />
            {errors.password && <p className="p-1 text-danger">Mật khẩu tối thiểu 8 ký tự</p>}
          </div>
          <div className="text-center fs-6 p-2">
            <span>Nếu bạn đã có tài khoản? </span>
            <Link to={"/login"} className="link text-dark fw-bold">
              Đăng nhập
            </Link>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-danger">
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
