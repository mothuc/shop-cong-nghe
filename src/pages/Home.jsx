import React from "react";
import ListsProduct from "../components/ListsProduct";
import Filter from "../components/Filter";
import { Container } from "react-bootstrap";
function Home() {
  return (
    <div className=" container py-3">
      <Filter />
      <ListsProduct />
    </div>
  );
}

export default Home;
