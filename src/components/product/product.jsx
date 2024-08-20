import "./product.scss";
import { Link } from 'react-router-dom';
  
  const Product = ({ item }) => {
    return (
      <div className="product">
        <Link to={`/products/${item._id}`} className="link">
        <div className="container" >
          <img src={item.cover} alt="" />
          <div className="info">
            <span>{item.brand}</span>
            <h2>{item.title}</h2>
            <h4>${item.price}</h4>
          </div>
        </div>
        </Link>
      </div>
    );
  };
  
  export default Product;
  