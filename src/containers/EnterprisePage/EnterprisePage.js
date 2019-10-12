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

import { loadData } from './EnterprisePage.duck';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import css from './EnterprisePage.css';
import image from './enterprise-pic.jpg';


export class EnterprisePageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    const Heading = ({ children }) => <h1 className={css.pageTitle}>{children}</h1>;
    const Text = ({ children }) => <p>{children}</p>;
    const List = ({ children }) => <ul className={css.bodyUnorderedList}>{children}</ul>;

    this.staticPageRenderOptions = {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
          <Text>{children}</Text>
        ),
        [BLOCKS.HEADING_1]: (node, children) => (
          <Heading>{children}</Heading>
        ),
        [BLOCKS.UL_LIST]: (node, children) => (
          <List>{children}</List>
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
    const pageData = this.props.enterprisePageData['body'];
    
    let renderedData = this.renderData(pageData, this.staticPageRenderOptions);
    
    return (
      <StaticPage
        title="Outdoorcoach for business"
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
            <img className={css.coverImage} src={image} alt="Skidåkare i grupp" />
            <div className={css.contentWrapper}>
              {renderedData}
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
  const { 
    enterprisePageEntryId,
    enterprisePageFetched,
    enterprisePageData,
    enterprisePageFetchError,
  } = state.EnterprisePage;

  return {
    enterprisePageEntryId,
    enterprisePageFetched,
    enterprisePageData,
    enterprisePageFetchError,
  };
};

const EnterprisePage = compose(
  connect(
    mapStateToProps
  ),withRouter,
)(EnterprisePageComponent);

EnterprisePage.loadData = () => {
  let entryId = "G554w29YnmNw5AcuVhoyW";
  return loadData(entryId);
};


export default EnterprisePage;