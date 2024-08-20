import Search from '@mui/icons-material/Search';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';


const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const { data: cartData, isLoading, isError } = useQuery({
    queryKey: ['cart', currentUser?._id],
    queryFn: async () => {
      if (currentUser) {
        const response = await newRequest.get(`/cart/${currentUser._id}`);
        return response.data;
      }
      return null;
    },
  });

  const cartQuantity = cartData?.products.reduce((total, product) => total + product.quantity, 0) || 0;

  return (
    <div className="navbar">
      <div className="container">
        <div className="wrapper">
          <div className="left">
            <span>EN</span>
            <div className="searchContainer">
              <input type="text" placeholder='Search'/>
              <Search/>
            </div>
          </div>
          <div className="center">
            <Link to={"/"} className='link'>
              <h1>Sole Craze</h1>
            </Link>
          </div>
          <div className="right">
            {!currentUser && <div className="menuItem">
              <Link className='link' to="/register">REGISTER</Link>
            </div>}
            {!currentUser && <div className="menuItem">
              <Link className='link' to="/login">SIGN IN</Link>
            </div> }
            <div className="menuItem">
              <Link className='link' to="/cart">
                <div className="circle" style={{display: !cartQuantity ? "none" : "flex"}}>
                  <span>{cartQuantity}</span>
                </div>
                <ShoppingCartOutlined/>
              </Link>
            </div>
            <div className="menuItem">
              <div className="user" onClick={() => setOpen(!open)}>
                <img src="/img/noavatar.jpg" alt="" />
                <span>{currentUser?.firstName}</span>
                {open && (
                <div className="options">
                      <Link className="link" to="/myAccount">
                        My Account
                      </Link>
                      <Link className="link" to="/orders">
                        My Orders
                      </Link>
                      <Link className="link" onClick={handleLogout}>
                        Logout
                      </Link>
                </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
