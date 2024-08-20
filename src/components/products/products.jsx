import React from "react";
import "./products.scss";
import Product from "../product/product";
import { useQuery } from "@tanstack/react-query";
import newRequest from "./../../utils/newRequest";

const Products = ({ sizeFilter, colorFilter, brandFilter, sortOption }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      newRequest
        .get(`/products/?new=true`)
        .then((res) => {
          return res.data;
        }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  // Filtering logic
  let filteredProducts = data;

  if (sizeFilter) {
    const numericSizeFilter = parseInt(sizeFilter, 10); // Convert sizeFilter to a number
    filteredProducts = filteredProducts.filter((product) =>
      product.size.includes(numericSizeFilter)
    );
  }

  if (colorFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.color === colorFilter
    );
  }

  if (brandFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand === brandFilter
    );
  }

  // Sorting logic
  if (sortOption === "Price (asc)") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "Price (desc)") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "Newest") {
    filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div className="products">
      {Array.isArray(filteredProducts) && (
        <div className="container">
          {filteredProducts.map((item) => (
            <Product item={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
