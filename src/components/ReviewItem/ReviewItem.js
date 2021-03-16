import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, key, price } = props.product;
  const removeProduct = props.removeProduct;
  return (
    <div className="review-item" style={{ borderBottom: "1px solid gray" }}>
      <h4 className="product-name">Product name {name} </h4>
      <p>quantity {quantity}</p>
      <br />
      <p>Price ${price}</p>
      <button className="main-button" onClick={() => removeProduct(key)}>
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
