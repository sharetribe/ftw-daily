import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import config from '../../config';
import {
  Page,
  SectionHero,
  SectionLocations,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '../../containers';

import facebookImage from '../../assets/saunatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/saunatimeTwitter-600x314.jpg';
import css from './LandingPage.css';

export const LandingPageComponent = props => {
  const { history, intl, location, scrollingDisabled } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
  const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;

  return (
    <Page
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
      ]}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: schemaDescription,
        name: schemaTitle,
        image: [schemaImage],
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.heroContainer}>
            <SectionHero className={css.hero} history={history} location={location} />
          </div>
          <ul className={css.sections}>
            <li className={css.section}>
              <div className={css.sectionContentFirstChild}>
                <SectionLocations />
              </div>
            </li>
            
            <li className={css.sections} className={css.whyUseBg}>
            
            <div className={css.sectionContent}>

            <h1>Why use Trust My Pet Sitter?</h1>

            <div className={css.whyUse}>

            <div className={css.whyContainer}>

            <h2>In Safe Hands</h2>

            <p>We conduct stringent ID Verification checks to ensure the safety of your pets and your home</p>

            <a href="#">Start Now</a>

            </div>

            <div className={css.whyContainer}>
            
            <h2>Our Community</h2>

            <p>Make new friends among our community of like minded pet lovers, both near and far!</p>

            <a href="#">Start Now</a>

            </div>

            </div>

            </div>

            </li>

            <li className={css.section}>

              <div id="how-padding" className={css.sectionContent}>

               <div id="howitworks-title">
                
               <h1>Happy Pets = Happy Owners</h1>

               </div>

               <div id="how-it-works">

               <div id="three-containers">

               <h2>Live-in Pet Sitter</h2>

               <ul id="howitworks-ul">

               <li>24/7 Pet Care</li>
               <li>1:1 Play and Attention</li>
               <li>Own safe environmente</li>
               <li>Your home cared for</li>
               <li>Vetted Pet Sitters</li>
               <li>Perfect for nervous dogs</li>
               <li>Daily pics and videos</li>
               <li>You select your ideal sitter</li>

               </ul>

               </div>

               <div id="three-containers">

               <h2>Drop in Visits</h2>

               <ul id="howitworks-ul">

               <li>24/7 Pet Care</li>
               <li>1:1 Play and Attention</li>
               <li>Own safe environmente</li>
               <li>Your home cared for</li>
               <li>Vetted Pet Sitters</li>
               <li>Perfect for nervous dogs</li>
               <li>Daily pics and videos</li>
               <li>You select your ideal sitter</li>

               </ul>

               </div>

               <div id="three-containers">
               
               <h2>Dog Walkers</h2>

               <ul id="howitworks-ul">

               <li>24/7 Pet Care</li>
               <li>1:1 Play and Attention</li>
               <li>Own safe environmente</li>
               <li>Your home cared for</li>
               <li>Vetted Pet Sitters</li>
               <li>Perfect for nervous dogs</li>
               <li>Daily pics and videos</li>
               <li>You select your ideal sitter</li>

               </ul>

               </div>

               </div>

               <a href="#" id="how-button">Start Now</a>

              </div>

            </li>


          </ul>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

const { bool, object } = PropTypes;

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(LandingPageComponent);

export default LandingPage;
