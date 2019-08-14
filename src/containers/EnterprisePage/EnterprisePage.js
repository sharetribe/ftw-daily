import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

//import { loadData } from './EnterprisePage.duck';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import css from './EnterprisePage.css';
//import image from './about-us-1056.jpg';


export class EnterprisePageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    const staticPageRenderOptions = {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
          <p>{children}</p>
        ),
        [BLOCKS.HEADING_1]: (node, children) => (
          <h1 className={css.pageTitle}>{children}</h1>
        )
      },
    };
    this.renderData = this.renderData.bind(this);
  }

  renderData(documentData, options) {
    let renderedData = documentToReactComponents(documentData, options);

    return renderedData
  }

  
  render() {
    //const pageData = this.props.enterprisePageData['body'];
    
    //let renderedData = this.renderData(pageData, this.staticPageRenderOptions);
    //let renderedHeading = renderedData[0];
    //let renderedBody = renderedData.shift();
    // prettier-ignore
    return (
      <StaticPage
        title="Enterprise sports coaching"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'EnterprisePage',
          description: 'Custom sports solutions for employers',
          name: 'Enterprise page',
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>

          <LayoutWrapperMain className={css.staticPageWrapper}>
            <div className={css.contentWrapper}>
            Looking for page 
            </div>
          </LayoutWrapperMain>

          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage>
    );
  }

  
};

const mapStateToProps = state => {
  const { temp
    //enterprisePageEntryId,
    //enterprisePageFetched,
    //enterprisePageData,
    //enterprisePageFetchError,
  } = 'null';

  return {
    temp
  };
};

const EnterprisePage = compose(
  withRouter,
  connect(
    mapStateToProps
  )
)(EnterprisePageComponent);

EnterprisePage.loadData = () => {
  let entryId = "2ANXWkYxw6pMjL4qEWyria";
  //return loadData(entryId);
};


export default EnterprisePage;