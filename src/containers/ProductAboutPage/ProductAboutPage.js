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
import css from './ProductAboutPage.css';
// import image from './path/to/image.png';

const ProductAboutPage = () => {
    

  return (
    <StaticPage
      className={css.root}
      title = "ProductAbout"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ProductAboutPage',
        description: 'About product',
        name: 'Product About Page',
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

export default ProductAboutPage;