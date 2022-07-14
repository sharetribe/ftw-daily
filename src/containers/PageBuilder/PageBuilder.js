import React from 'react';
import { arrayOf, func, node, oneOf, shape, string } from 'prop-types';

import { Footer as FooterContent } from '../../components/index.js';
import { TopbarContainer } from '../../containers/index.js';

import LayoutComposer from './LayoutComposer/index.js';
import SectionBuilder from './SectionBuilder/SectionBuilder.js';
import StaticPage from './StaticPage.js';

import css from './PageBuilder.module.css';

//////////////////
// Page Builder //
//////////////////

/**
 * PageBuilder can be used to build content pages using page-asset.json.
 *
 * Note: props can include a lot of things that depend on
 * - pageAssetsData: json asset that contains instructions how to build the page content
 *   - asset should contain an array of _sections_, which might contain _fields_ and an array of _blocks_
 *     - _blocks_ can also contain _fields_
 * - fallbackPage: component. If asset loading fails, this is used instead.
 * - options: extra mapping of 3 level of sub components
 *   - sectionComponents: { ['my-section-type']: { component: MySection } }
 *   - blockComponents: { ['my-component-type']: { component: MyBlock } }
 *   - fieldComponents: { ['my-field-type']: { component: MyField, pickValidProps: data => Number.isInteger(data.content) ? { content: data.content } : {} }
 *     - fields have this pickValidProps as an extra requirement for data validation.
 * - pageProps: props that are passed to src/components/Page/Page.js component
 *
 * @param {Object} props
 * @returns page component
 */
const PageBuilder = props => {
  const { pageAssetsData, inProgress, fallbackPage, options, ...pageProps } = props;

  if (!pageAssetsData && fallbackPage && !inProgress) {
    return fallbackPage;
  }

  const data = pageAssetsData || {};
  const sectionsData = data?.sections || [];

  const layoutAreas = `
    topbar
    main
    footer
  `;
  return (
    <StaticPage {...pageProps}>
      <LayoutComposer areas={layoutAreas} className={css.layout}>
        {props => {
          const { Topbar, Main, Footer } = props;
          return (
            <>
              <Topbar as="header" className={css.topbar}>
                <TopbarContainer />
              </Topbar>
              <Main as="main" className={css.main}>
                <SectionBuilder sections={sectionsData} options={options} />
              </Main>
              <Footer>
                <FooterContent />
              </Footer>
            </>
          );
        }}
      </LayoutComposer>
    </StaticPage>
  );
};

export { StaticPage };

export default PageBuilder;
