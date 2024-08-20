import "./categories.scss";
import { categories } from "../../data";
import CategoryItem from "../categoryItem/categoryItem";

const Categories = () => {
  return (
    <div className="categories">
      <div className="container">
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
