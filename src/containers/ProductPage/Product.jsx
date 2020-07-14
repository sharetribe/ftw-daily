import React from 'react';

function Product(props){
    return (
        <div>
            <h3>{props.productName}</h3>
            <p>{props.productDescription}</p>
        </div>
    );
};

export default Product;