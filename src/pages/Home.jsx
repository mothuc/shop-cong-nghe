import React, { useEffect, useState } from "react";
import ListsProduct from "../components/ListsProduct";
import Filter from "../components/Filter";
import axiosClient from "../apis/axiosClient";

function Home() {
  const [products, setproducts] = useState([]);
  const [filterByBrand, setFilterbyBrand] = useState("all");
  const [productByBrand, setProductByBrand] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosClient.get("/products");
        const results = res.data;
        setproducts(results);
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    })();
  }, []);
  console.log(products);

  const handleFilter = (childData) => {
    setFilterbyBrand(childData);
  };

  useEffect(() => {
    const result = products.filter((p) => p.type.toLowerCase() === filterByBrand.toLowerCase());
    setProductByBrand(result);
  }, [products, filterByBrand]);

  return (
    <div className="container">
      <Filter parentCallback={handleFilter} />
      <ListsProduct products={filterByBrand === "all" ? products : productByBrand} />
    </div>
  );
}

export default Home;
