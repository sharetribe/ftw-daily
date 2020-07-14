import React from 'react';
import css from './ProductPage.css'

function Product(props){
    const imgSrc = require("" + props.productImg + "");
    return (
        <div className={css.productContainer}>
            <div className={css.productImageContainer}>
                
            </div>
            <div className={css.productContent}>
                <div className={css.words}>
                    <div className={css.productHeader}>
                        <h3>{props.productName}</h3>
                    </div>
                    <div className={css.productDescript}>
                        <p>{props.productDescription}</p>
                    </div>
                </div>
                <div className={css.feature}>
                    <img className={css.productImage} src={imgSrc} alt={props.productName}></img>
                </div>
            </div>
        </div>
    );
};

export default Product;