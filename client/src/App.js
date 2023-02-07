import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import SingleProductPage from "./pages/singleProductPage";
import CartPage from "./pages/cartPage";
import { useEffect } from "react";
import axios from "axios";

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
        .get("/api/user/verify", config)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
export default App;
