import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, currentUser, db } from "../firebase";
import { logout } from "../reducers/authSlice";

function Profile() {
  const [profile, setProfile] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxAuth = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserInfor = async () => {
      try {
        const docRef = doc(db, "users", reduxAuth.user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
          console.log(profile);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfor();
  }, [reduxAuth]);

  console.log(profile);
  const handleLogout = async () => {
    const user = { ...currentUser };
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
    dispatch(logout({ user }));
    navigate("/");
  };

  return (
    <div className="container p-4">
      <h3>Thông tin tài khoản</h3>
      {profile && (
        <div>
          <p>
            <span className="fw-bold">Họ và tên: </span> {profile?.fullname}
          </p>
          <p>
            <span className="fw-bold">Email: </span> {profile?.email}
          </p>
          <p>
            <span className="fw-bold">Số điện thoại: </span>{" "}
            {!profile.phoneNumber ? "" : `${profile.phoneNumber}`}
          </p>
          <p>
            <span className="fw-bold">Địa chỉ: </span>
            {!profile.address ? "" : `${profile.address}`}
          </p>
        </div>
      )}
      <button onClick={handleLogout} className="btn bg-danger">
        Đăng xuất
      </button>
    </div>
  );
}

export default Profile;
