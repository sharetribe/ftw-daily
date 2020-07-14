import React from 'react';
import css from "./ProductPage.css";

function Product(props){
    const imgSrc = require("" + props.productImg + "");
    return (
        <div>
            <h3>{props.productName}</h3>
            <p>{props.productDescription}</p>
            <img src={imgSrc} alt={props.productName}></img>
        </div>
    );
};

export default Product;