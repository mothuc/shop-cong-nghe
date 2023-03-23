import React, { useEffect, useState } from "react";
import axiosClient from "../apis/axiosClient";
import Card from "./Card";

function ListsProduct() {
  const [products, setproducts] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosClient.get("/products");
        const results = res.data;
        setproducts(results);
      } catch (error) {
        console.log("Failed to fetch user", error);
      }
    })();
  }, []);
  console.log(products);
  return (
    <div className="container">
      <div className="row row-cols-5 gy-4">
        {products && products?.map((product) => <Card product={product} key={product.id} />)}
      </div>
    </div>
  );
}

export default ListsProduct;
