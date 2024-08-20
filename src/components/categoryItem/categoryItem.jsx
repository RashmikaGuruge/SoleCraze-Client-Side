import "./categoryItem.scss";

const CategoryItem = ({ item }) => {
  return (
    <div className="categoryItem">
      <div className="container">
        <img src={item.img} alt="" />
        <div className="info">
          <h1>{item.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
