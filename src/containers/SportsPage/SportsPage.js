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

import { loadData } from './SportsPage.duck';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import css from './SportsPage.css';
import image from './sports-cover-winter.jpg';


export class SportsPageComponent extends Component {
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
    const pageData = this.props.sportsPageEntities;
    console.log(pageData);
    
    
    
    return (
      <StaticPage
        title="Sports"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'SportsPage',
          description: 'Sports offered on outdoorcoach',
          name: 'Sports page',
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>

          <LayoutWrapperMain className={css.staticPageWrapper}>
            <img className={css.coverImage} src={image} alt="Outdoorcoach logotyp" />
            <div className={css.contentWrapper}>
              {}Hi
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
    sportsPageFetched,
    sportsPageEntities,
    sportsPageFetchError,
  } = state.SportsPage;

  return {
    sportsPageFetched,
    sportsPageEntities,
    sportsPageFetchError,
  };
};

const SportsPage = compose(
  connect(
    mapStateToProps
  ),withRouter,
)(SportsPageComponent);

SportsPage.loadData = () => {
  return loadData('sport');
};


export default SportsPage;