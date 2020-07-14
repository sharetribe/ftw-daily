import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';

import {
    LayoutSingleColumn,
    LayoutWrapperTopbar,
    LayoutWrapperMain,
    LayoutWrapperFooter,
    Footer,
    // NamedLink,
    // ExternalLink,
} from '../../components';

import products from './products';
import Product from './Product';
import css from './ProductPage.css';
// import image from './path/to/image.png';

const ProductPage = () => {
    

  return (
    <StaticPage
      className={css.root}
      title="Product"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ProductPage',
        description: 'Feature products',
        name: 'Product page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
            <h1>Products</h1>
            {products.map(item => {
                return (
                    <Product 
                        productName={item.productName}
                        productDescription={item.productDescription}
                    />
                );
            })}
          
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ProductPage;