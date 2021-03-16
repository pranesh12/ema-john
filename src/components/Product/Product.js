import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Product = (props) => {
  const { name, img, seller, price, stock, key } = props.product;
  const showAddToCart = props.showAddToCart;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="product-name">
        <h3>
          <Link to={"/product/" + key}>{name}</Link>
        </h3>
        <br />
        <p>
          <small>{seller}</small>
        </p>
        <p>${price}</p>
        <br />
        <p>Only {stock} left in Stock order -soon</p>
        <br />
        {showAddToCart && (
          <button
            className="main-button"
            onClick={() => props.handleAddProduct(props.product)}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
