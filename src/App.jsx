import Home from './pages/home/home';
import Product from './pages/product/product';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Cart from './pages/cart/cart';
import ProductList from './pages/productList/productList';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Announcement from './components/announcement/announcement';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
//import Success from './pages/success';
import Pay from './pages/pay/pay';
import Success from './pages/success/success';
import Orders from './pages/orders/orders';
import Myaccount from './pages/myAccount/myAccount';

function App() {

  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
        <Announcement />
        <Navbar />
        <Outlet />
        <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/myAccount",
          element: <Myaccount />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    
  ]);

  return <RouterProvider router={router} />;
  
}

export default App;
