import React from "react";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";

function ListsProduct({ products }) {
  return (
    <div className="row row-cols-auto justify-content-start gap-4">
      {products && products.map((product) => <Card product={product} key={uuidv4()} />)}
    </div>
  );
}

export default ListsProduct;
