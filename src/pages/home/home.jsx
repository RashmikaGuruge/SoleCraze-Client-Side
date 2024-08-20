import React from "react";
import Categories from "../../components/categories/categories";
import Newsletter from "../../components/newsletter/newsletter";
import Products from "../../components/products/products";
import Slider from "../../components/slider/slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
    </div>
  );
};

export default Home;
