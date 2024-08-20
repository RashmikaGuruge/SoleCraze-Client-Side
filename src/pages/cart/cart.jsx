import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import "./cart.scss";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [products, setProducts] = useState([]);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      newRequest.get(`/cart/${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const fetchProducts = async (productId) => {
    try {
      const response = await newRequest.get(`/products/${productId}`);
      return response.data;
      
    } catch (err) {
      console.log(err);
      return 'Unknown Product';
    }
  }

  const renderCart = async () => {
    const rows = [];

    if (!data || !data.products) {
      // Handle the case where data or data.products is undefined
      console.log("Cart is empty")
      return rows;
    }
    
    console.log(data.products)
    for (const product of data.products) {
      const productData = await fetchProducts(product.productId);

      rows.push({
        id: productData._id,
        img: productData.cover,
        title: productData.title,
        price: product.price,
        quantity: product.quantity,
        size: product.size,
        color: productData.color
      });
    }

    return rows;
  }

  

  useEffect(() => {
    renderCart().then((products) => setProducts(products));
  }, [data]);

  const updateProductQuantity = async (productId, newQuantity) => {
    try {
      console.log("Updating quantity:", { productId, newQuantity });
  
      // Make a PUT request to update the quantity on the server
      const response = await newRequest.put(`/cart/${currentUser._id}`, {
        productId,
        quantity: newQuantity,
      });
  
      console.log("PUT response:", response);
  
      // Update the local state to reflect the new quantity
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, quantity: newQuantity } : product
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Handle error as needed
    }
  };
  

  const handleQuantityAdd = (productId, q) => {
    const newQuantity = q + 1;
    updateProductQuantity(productId, newQuantity); // Update the quantity for the specific product
  };

  const handleQuantityRemove = (productId, q) => {
    const newQuantity = q <= 1 ? 1 : q - 1;
    updateProductQuantity(productId, newQuantity); // Update the quantity for the specific product
  };

  const handleRemoveProduct = (productId) => {
      mutation.mutate(productId);
  };

  const mutation = useMutation({
    mutationFn: (productId) => {
      return newRequest.delete(`/cart/${currentUser._id}/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  console.log(data)
  const subTotal = products.reduce((total, product) => total + (product.quantity * product.price), 0) || 0;

  return (
    <div className="cart">
      <div className="container">
        <div className="wrapper">
          <h1>YOUR CART</h1>
          <div className="top">
            <Link className="link" to="/products">
              <button>CONTINUE SHOPPING</button>
            </Link>
          </div>
          <div className="bottom">
            <div className="info">
              { products.map((product) => (
                <div className="product" key={product.id}>
                <div className="productDetail">
                  <img src={product.img} />
                  <div className="details">
                    <span><b>{product.title}</b> </span>
                    <span>{product.color}</span>
                    <span>EU {product.size}</span>
                    <span>$ {product.price}</span>
                  </div>
                </div>
                <div className="priceDetail">
                  <div className="productAmountContainer">
                    <div className="quantityContainer">
                      <div className="add" onClick={() => handleQuantityAdd(product.id, product.quantity)}>
                        <Add/>
                      </div>
                      <div className="productAmount">
                        <span>{product.quantity}</span>
                      </div>
                      <div className="minus" onClick={() => handleQuantityRemove(product.id, product.quantity)}>
                        <Remove/>
                      </div>
                    </div>
                    <span className='removeProduct' onClick={() => handleRemoveProduct(product.id)}>Remove</span>
                  </div>
                  <div className="productPrice">
                    <span>$ {product.price * product.quantity}</span>
                  </div>
                </div>
                
                </div>
                
              ))}
              <hr />
            </div>
            <div className="summary">
              <h1>ORDER SUMMARY</h1>
              <div className="summaryItem">
                <span>Subtotal</span>
                <span>$ {subTotal}</span>
              </div>
              <div className="summaryItem">
                <span>Estimated Shipping</span>
                <span>$ {data ? 20 : 0}</span>
              </div>
              <div className="summaryItemTotal">
                <span>Total</span>
                <span>$ {data ? subTotal + 20 : 0}</span>
              </div>
              <Link to={data && `/pay/${data._id}`}>
                <button>CHECKOUT NOW</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
