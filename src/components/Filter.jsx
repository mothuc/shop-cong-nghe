import React from "react";

function Filter({ parentCallback }) {
  const handleClickbrand = (e) => {
    e.preventDefault();
    parentCallback(e.target.value);
  };

  return (
    <div className="p-4 d-flex justify-content-center gap-3">
      <button
        value={"all"}
        onClick={handleClickbrand}
        className="btn"
        style={{ backgrounColor: "#f3f4f6", border: "1px solid #e5e7eb" }}
      >
        All
      </button>
      <button
        value={"iphone"}
        onClick={handleClickbrand}
        className="btn"
        style={{ backgrounColor: "#f3f4f6", border: "1px solid #e5e7eb" }}
      >
        Apple
      </button>
      <button
        value={"Samsung"}
        onClick={handleClickbrand}
        className="btn"
        style={{ backgrounColor: "#f3f4f6", border: "1px solid #e5e7eb" }}
      >
        Samsung
      </button>
      <button
        value={"Oppo"}
        onClick={handleClickbrand}
        className="btn"
        style={{ backgrounColor: "#f3f4f6", border: "1px solid #e5e7eb" }}
      >
        Oppo
      </button>
      <button
        value={"Xiaomi"}
        onClick={handleClickbrand}
        className="btn"
        style={{ backgrounColor: "#f3f4f6", border: "1px solid #e5e7eb" }}
      >
        Xiaomi
      </button>
      <button
        value={"Realme"}
        onClick={handleClickbrand}
        className="btn"
        style={{ backgrounColor: "#f3f4f6", border: "1px solid #e5e7eb" }}
      >
        Realme
      </button>
    </div>
  );
}

export default Filter;
