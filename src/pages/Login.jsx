import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../reducers/authSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   signInWithEmailAndPassword(auth, data.email, data.password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       user.displayName = data.fullname;
  //       dispatch(login({ user }));
  //       console.log(user);
  //       navigate("/profile");
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //     });
  // };

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      user.displayName = data.fullname;
      dispatch(login({ user }));
      console.log(user);
      navigate("/profile");
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);

      if (errorCode === "auth/wrong-password") {
        setError("Mật khẩu không đúng.");
      } else if (errorCode === "auth/user-not-found") {
        setError("Tài khoản không tồn tại.");
      }
    }
  };

  return (
    <div className="container mt-3 p-4">
      <div className="text-center">
        <h2>Đăng nhập</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {errors.email && <p className="p-1 text-danger">Email không hợp lệ</p>}
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
            {errors.password && <p className="p-1 text-danger">Sai mật khẩu</p>}
          </div>
          {error && <p className="p-1 text-danger fs-6"> {error}</p>}
          <div className="text-center fs-6 p-2">
            <span>Nếu bạn chưa có tài khoản? </span>
            <Link to={"/register"} className="link text-dark fw-bold">
              Đăng ký
            </Link>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-danger">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
