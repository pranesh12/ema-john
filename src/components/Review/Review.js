import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import fakeData from "../../fakeData";
import funnyGif from "../../images/giphy.gif";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlace, setOrderPlace] = useState(false);
  const history = useHistory();
  const handleProceedCheckout = () => {
    history.push("/shipment");
  };
  useEffect(() => {
    const savedData = getDatabaseCart();
    const productKey = Object.keys(savedData);
    const cardProducts = productKey.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedData[key];
      return product;
    });
    setCart(cardProducts);
  }, []);

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  return (
    <div className="twin-container">
      <div className="product-container">
        {orderPlace && <img src={funnyGif}></img>}

        {cart.map((pd) => (
          <ReviewItem removeProduct={removeProduct} product={pd}></ReviewItem>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="main-button">
            Proceed checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
