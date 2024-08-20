import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./orders.scss";
import newRequest from './../../utils/newRequest';
import { useMutation, useQuery } from '@tanstack/react-query';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders/${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });
  
  console.log(data)

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
  
    if (!data) {
      // Handle the case where data is undefined
      console.log("Orders are empty");
      return rows;
    }
  
    console.log(data);
  
    for (const order of data) {
      const products = order.products;
  
      if (!products || products.length === 0) {
        // Handle the case where products in the order are undefined or empty
        console.log("Products in the order are empty");
        continue; // Skip to the next iteration
      }
  
      for (const product of products) {
        const productData = await fetchProducts(product.productId);
  
        rows.push({
          id: productData._id,
          img: productData.cover,
          title: productData.title,
          brand: productData.brand,
          price: productData.price,
          quantity: product.quantity,
        });
      }
    }
  
    return rows;
  };

  useEffect(() => {
    renderCart().then((orders) => setOrders(orders));
  }, [data]);
 
  return (
    <div className="orders">
      {isLoading ? ("loading") : error ? ("something went wrong!") : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          {!data ? <span> You haven't placed any orders yet.</span> :
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <Link to={`/products/${order.id}`}>
                  <td>
                    <img
                      className="image"
                      src={order.img}
                      alt=""
                    />
                  </td>
                  </Link>
                  <td>{order.title}</td>
                  <td>{order.brand}</td>
                  <td>$ {order.price}</td>
                  <td>{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          }
        </div>
      )}
    </div>
  );
};

export default Orders;
