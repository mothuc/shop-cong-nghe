import React from "react";
import Card from "./Card";

function ListsProduct({ products }) {
  return (
    <div className="row row-cols-auto g-4">
      {products && products.map((product) => <Card product={product} key={product.id} />)}
    </div>
  );
}

export default ListsProduct;
