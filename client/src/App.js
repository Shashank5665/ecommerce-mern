import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import SingleProductPage from "./pages/singleProductPage";
import CartPage from "./pages/cartPage";
import { useEffect } from "react";
import axios from "axios";
import Success from "./pages/successPlace";
import Layout from "./components/layout";
import OrderPage from "./pages/orderPage";
import CheckoutPage from "./pages/checkoutPage";
import { BASE_URL } from "./services/helper";

function App() {
  const navigate = useNavigate();

  //For verifying whether the user token is present and valid
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authentication: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      axios
        .get(`${BASE_URL}/api/user/verify`, config)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          console.log(33, err);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="" element={<Layout />}>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}
export default App;
