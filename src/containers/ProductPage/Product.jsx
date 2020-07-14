import React from 'react';
import css from "./ProductPage.css";

function Product(props){
    return (
        <div>
            <h3 className={css.test}>{props.productName}</h3>
            <p>{props.productDescription}</p>
        </div>
    );
};

export default Product;