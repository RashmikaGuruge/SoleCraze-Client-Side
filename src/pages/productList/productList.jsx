import "./productList.scss";
import Products from "../../components/products/products";
import Newsletter from "../../components/newsletter/newsletter";
import { useState } from "react";

const ProductList = () => {
  const [sizeFilter, setSizeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Event handlers for filter changes
  const handleSizeChange = (event) => {
    setSizeFilter(event.target.value);
  };

  const handleColorChange = (event) => {
    setColorFilter(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrandFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
    <div className="productList">
      <div className="container">
        <span>MEN'S / SHOES</span>
        <h1>Men's Shoes and Sneakers</h1>
        <div className="filterContainer">
          <div className="filter_products">
            <span>Filter Products:</span>
            <select name="" id="" onChange={handleSizeChange} value={sizeFilter}>
              <option value="">Size</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
            <select name="" id="" onChange={handleColorChange} value={colorFilter}>
              <option value="">Color</option>
              <option>White</option>
              <option>Black</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
            </select>
            <select name="" id="" onChange={handleBrandChange} value={brandFilter}>
              <option value="">Brand</option>
              <option>Nike</option>
              <option>Adidas</option>
              <option>Jordan</option>
              <option>New Balance</option>
              <option>Decibel</option>
            </select>
          </div>
          <div className="sort_products" onChange={handleSortChange} value={sortOption}>
            <span>Sort Products:</span>
            <select name="" id="">
              <option value="">Newest</option>
              <option>Price (asc)</option>
              <option>Price (desc)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <Products 
      sizeFilter={sizeFilter}
      colorFilter={colorFilter}
      brandFilter={brandFilter}
      sortOption={sortOption}
    />
    <Newsletter />
    </div>
  );
};

export default ProductList;
