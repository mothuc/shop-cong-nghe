import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputInfor from "./InputInfor";
import OrderInfor from "./OrderInfor";

function Payment() {
  const orderInfor = useSelector((state) => state.order);
  console.log(orderInfor);
  const [inputFlag, setInputFlag] = useState(false);

  const handleInput = (data) => {
    setInputFlag(true);
  };
  return (
    <div className="container p-4 ">
      <div className={`${inputFlag ? "d-none" : ""}`}>
        <InputInfor handleInput={handleInput} />
      </div>
      <div className={`${inputFlag ? "d-block" : "d-none"}`}>
        <OrderInfor orderInfor={orderInfor} />
      </div>
    </div>
  );
}

export default Payment;
