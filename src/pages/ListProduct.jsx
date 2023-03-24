import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";

import ListsProduct from "../components/ListsProduct";

function Home() {
  const [productList, setProductList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  // setSearchKeyword(keyword);
  // https://api-smartphone-nu.vercel.app/products?q=iPhone
  //Để lọc sản phẩm theo tên, ta sử dụng http://localhost:3000/products?name_like={searchTerm}.
  //Để tìm kiếm sản phẩm theo từ khóa, ta sử dụng http://localhost:3000/products?q={searchTerm}.

  useEffect(() => {
    let url = "http://api-smartphone-nu.vercel.app/products";

    if (selectedBrand === "all") {
      url = "http://api-smartphone-nu.vercel.app/products";
    } else if (selectedBrand !== "") {
      url = `http://api-smartphone-nu.vercel.app/products?name_like=${selectedBrand}`;
    }
    axios
      .get(url)
      .then((response) => setProductList(response.data))
      .catch((error) => console.log(error));
  }, [selectedBrand]);
  console.log(productList);

  const handleFilter = (childData) => {
    setSelectedBrand(childData);
  };

  return (
    <div className="container">
      <Filter parentCallback={handleFilter} />
      <ListsProduct products={productList} />
    </div>
  );
}

export default Home;
