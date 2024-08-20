import "./productView.scss";
import { Slider } from "infinite-react-carousel/lib";
import Newsletter from "../../components/newsletter/newsletter";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from '@tanstack/react-query';
import newRequest from './../../utils/newRequest';
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Reviews from "../../components/reviews/reviews";


const Product = () => {
  const {id} = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQauntity] = useState(1);
  const [productsAtCart, setProductsAtCart] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      newRequest.get(`/products/${id}`).then((res) => {
        return res.data;
      }),
  });

  console.log(data)
  const mutation = useMutation({
    mutationFn: async (cart) => {
      return newRequest.post("/cart", cart);
    },
    onSuccess: () => {
      navigate("/cart");
    },
  });
  
  const handleCart = (e) => {
    e.preventDefault();
  
    const cartData = {
      userId: currentUser._id,
      products: [
        {
          productId: id,
          quantity: quantity,
          size: selectedSize,
          price: data.price
        },
      ]
    };
  
    console.log(cartData);
    mutation.mutate(cartData);
  };


  const changeSize = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityAdd = (q) => {
    setQauntity(q+1);
  }

  const handleQuantityRemove = (q) => {
    (q <= 1) ? setQauntity(1) : setQauntity(q-1);
  }

  return (
    <div>
    <div className="productView">
    {isLoading ? ("loading") : error ? ("something went wrong!") : (
      <div className="container">
        <span className="topBar">BRANDS / NIKE</span>
        <div className="wrapper">
          <div className="imgContainer">
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.imgs.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <Reviews productId={id}/>
          </div>
          <div className="infoContainer">
                <span>{data.brand}</span>
                <h1>{data.title}</h1>
                <span>{data.cat}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                <div className="stars">
                  {Array(Math.round(data.totalStars / data.starNumber)).fill().map((data,i) => (
                    <img src="/img/star.png" alt=""  key={i}/>
                  ))}
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
                </div>
                )}
                <span className="price"><b>${data.price}</b></span>
                <hr />
                <div className="color">
                  <span><b>Color</b></span>
                  <span>{data.color}</span>
                </div>
                <div className="size">
                  <span><b>Select Size</b></span>
                  <div className="sizeboxContainer">
                    {data.size.length !==  0 ? 
                    data.size.map((s) => (
                       <div
                       key={s}
                       className={`sizebox ${selectedSize === s ? 'selected' : ''}`}
                       onClick={() => changeSize(s)}
                     >
                       <span>{s}</span>
                     </div>
                    )) : <span>Out Of Stock</span>}
                  </div>
                </div>
                <div className="quantityContainer">
                  <div className="add" onClick={() => handleQuantityAdd(quantity)}>
                    <AddIcon/>
                  </div>
                  <div className="quntity">
                    <span>{quantity}</span>
                  </div>
                  <div className="minus" onClick={() => handleQuantityRemove(quantity)}>
                    <RemoveIcon/>
                  </div>
                </div>
                  <button onClick={(e) => handleCart(e)}>Add to Cart</button>
                
          </div>
        </div>
      </div>
      )}  
    </div>
    
    <Newsletter />
    </div>
  );
};

export default Product;
