import React, { useState } from "react";
import "../card.css";

const Product = () => {
  const [quantity, setQuantity] = useState(0);
  let price = 100,
    total;

  total = quantity * price;

  console.table({ price, quantity, total });
  const decrementQuantity = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  };

  //write a function to send the data to the server
  const { data } = axios.post(
    "/api/user/",
    {
      quantity,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return (
    <>
      <div className="container">
        <h4 className="title">Mechanical keyboard</h4>
        <p>Keyboard with mechanical switches</p>
        <p className="price">Price: $100</p>
        <button
          className="changeItems"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
        <p className="quantity">{quantity}</p>
        <button className="changeItems" onClick={decrementQuantity}>
          -
        </button>
        <button className="cart" onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </>
  );
};

export default Product;
