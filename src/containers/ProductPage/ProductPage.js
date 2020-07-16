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
            <div className={css.PageTitle}>
              <h1>Our Products</h1>
            </div>
            <div className={css.productWrapper}>
              {products.map(item => {
                  return (
                      <Product 
                          productID={item.id}
                          productBanner={item.productBanner}
                          productName={item.productName}
                          productDescription={item.productDescription}
                          productImg={item.productImg}
                      />
                  );
              })}
            </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ProductPage;