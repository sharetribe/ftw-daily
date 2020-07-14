import React from 'react';
import css from './ProductPage.css'

function Product(props){
    return (
        <div className={css.productContainer}>

            <div className={css.productWords}>
                <div className={css.productHeader}>
                    <h3>{props.productName}</h3>
                </div>
                <div className={css.productDescript}>
                    <p>{props.productDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default Product;