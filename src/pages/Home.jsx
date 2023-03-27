import React, { useEffect, useState } from "react";
import { getAllProducts } from "../apis/getAllProduct";
import { getProductFiltered } from "../apis/getProductFiltered";
import Filter from "../components/Filter";

import ListsProduct from "../components/ListsProduct";

function Home() {
  const [productList, setProductList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("all");

  // setSearchKeyword(keyword);
  // https://api-smartphone-nu.vercel.app/products?q=iPhone
  //Để lọc sản phẩm theo tên, ta sử dụng http://localhost:3000/products?name_like={searchTerm}.
  //Để tìm kiếm sản phẩm theo từ khóa, ta sử dụng http://localhost:3000/products?q={searchTerm}.

  useEffect(() => {
    (async () => {
      try {
        if (selectedBrand === "all") {
          const data = await getAllProducts.getAll();
          setProductList(data);
        } else {
          const data = await getProductFiltered.getFiltered(selectedBrand);
          setProductList(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
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
