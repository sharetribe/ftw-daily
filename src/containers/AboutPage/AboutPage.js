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

import { loadData } from './AboutPage.duck';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import css from './AboutPage.css';
//import image from './about-us-1056.jpg';


export class AboutPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.staticPageRenderOptions = {
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
    const pageData = this.props.aboutPageData['body'];

    let renderedData = this.renderData(pageData, this.staticPageRenderOptions);
    //let renderedHeading = renderedData[0];
    //let renderedBody = renderedData.shift();
    // prettier-ignore
    return (
      <StaticPage
        title="About Us"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'AboutPage',
          description: 'About Outdoorcoach',
          name: 'About page',
        }}
      >
        <LayoutSingleColumn className={css.darkTheme}>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>

          <LayoutWrapperMain className={css.staticPageWrapper}>
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
    aboutPageEntryId,
    aboutPageFetched,
    aboutPageData,
    aboutPageFetchError,
  } = state.AboutPage;

  return {
    aboutPageEntryId,
    aboutPageFetched,
    aboutPageData,
    aboutPageFetchError,
  };
};

const AboutPage = compose(
  withRouter,
  connect(
    mapStateToProps
  )
)(AboutPageComponent);

AboutPage.loadData = () => {
  let entryId = "2ANXWkYxw6pMjL4qEWyria";
  return loadData(entryId);
};


export default AboutPage;