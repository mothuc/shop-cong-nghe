import currency from "currency.js";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

function OrderInfor() {
  const reduxAuth = useSelector((state) => state.auth);
  const [orderInfor, setOrderInfor] = useState({});
  const [userInfor, setUserInfor] = useState({});
  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  useEffect(() => {
    const getUserInfor = async () => {
      try {
        //get orders
        const ordersRef = doc(db, "orders", reduxAuth.user.uid);
        const ordersSnap = await getDoc(ordersRef);
        if (ordersSnap.exists()) {
          setOrderInfor(ordersSnap.data());
        } else {
          console.log("No such document!");
        }

        //Get userInfor
        const userRef = doc(db, "users", reduxAuth.user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserInfor(userSnap.data());
          console.log(userInfor);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfor();
  }, [reduxAuth]);

  return (
    <div className="container p-4">
      <button onClick={handleClick} className="btn bg-">
        Quay lại
      </button>
      {orderInfor && userInfor && (
        <div className="rounded-4 p-4" style={{ backgroundColor: "#d4edda" }}>
          <h4 className="fw-bold ">ĐẶT HÀNG THÀNH CÔNG</h4>
          <p>
            Mã đơn hàng : <span className="fw-bold">{orderInfor.orderId}</span>{" "}
          </p>
          <p>
            Người đặt: <span className="fw-bold">{userInfor.fullname}</span>
          </p>
          <p>
            Số điện thoại: <span className="fw-bold">{userInfor.phoneNumber}</span>
          </p>
          <p>
            Email: <span className="fw-bold">{userInfor.email}</span>
          </p>
          <p>
            Địa chỉ nhận hàng: <span className="fw-bold">{userInfor.address}</span>
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
      )}
    </div>
  );
}

export default OrderInfor;
