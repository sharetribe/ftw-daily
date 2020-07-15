import React from 'react';
import { StaticPage, TopbarContainer } from '..';

import {
    LayoutSingleColumn,
    LayoutWrapperTopbar,
    LayoutWrapperMain,
    LayoutWrapperFooter,
    Footer,
    // NamedLink,
    // ExternalLink,
} from '../../components';

// import products from '../ProductPage/products';
import css from './ProductDetailPage.css';
// import image from './path/to/image.png';

const ProductDetailPage = () => {
    

  return (
    <StaticPage
      className={css.root}
      title = "Product-Detail"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ProductDetailPage',
        description: 'Product Detail Page',
        name: 'Product Detail Page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
            <div>
              <h1>Test</h1>
            </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ProductDetailPage;