import React from 'react';
import css from './ProductPage.css'
import { Link } from 'react-router-dom';

function Product(props){
    const imgSrc = require("./img/" + props.productImg + "");
    const bannerSrc = require("./img/" + props.productBanner + "");
    return (
        <div className={css.productContainer}>
            <div className={css.productImageBanner}>
                <img className={css.banner} src={bannerSrc} alt={props.productName}></img>
            </div>
            <div className={css.productContent}>
                <div className={css.words}>
                    <div className={css.productHeader}>
                        <h3><Link to={'/product-detail/'+props.productID} className="nav-link">
                            {props.productName}
                        </Link></h3>
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