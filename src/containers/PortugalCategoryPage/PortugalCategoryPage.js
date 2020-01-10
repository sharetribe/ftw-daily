import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { StaticPage, TopbarContainer } from '../../containers';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { categoryListings } from './PortugalCategoryPage.duck';

import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ListingCard
} from '../../components';

import css from './PortugalCategoryPage.css';
import image from './hero-img.jpg';
import json from './PortugalCategoryPage.json';

const PORTUGAL_BOUNDS = [40.10246427,-6.189352,32.36728955,-31.367492];

class PortugalCategoryPageComponent extends Component {
  render() {
    const {
      title,
      description,
      ingress,
      content,
      sidecontent,
    } = json;

    const {
      listings
    } = this.props;

    return (
      <StaticPage
        title={title}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'Portugal',
          description: {description},
          name: {title},
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>

          <LayoutWrapperMain className={css.staticPageWrapper}>
            <h1 className={css.pageTitle}>{title}</h1>
            <img className={css.coverImage} src={image} alt="{altText}" />

            <div className={css.contentWrapper}>
              <div className={css.contentSide}>
                <p>{sidecontent}</p>
              </div>

              <div className={css.contentMain}>
                <div className={css.contentSection}>
                  <h2>{ingress}</h2>
                  {content.map((s, i) => (<p key={i}>{s}</p>))}
                </div>
                {listings && listings.length ? (
                  <div className={css.listingsContainer}>
                    <h2>Listings</h2>
                    <ul className={css.listings}>
                      {listings.map(l => (
                        <li className={css.listing} key={l.id.uuid}>
                          <ListingCard listing={l} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
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
    currentPageResultIds,
    pagination,
    categoryListingsError,
  } = state.PortugalCategoryPage;

  const listings = getListingsById(state, currentPageResultIds);

  return {
    listings,
    pagination,
    categoryListingsError
  };
}

const PortugalCategoryPage = compose(
  connect(
    mapStateToProps
  )
)(PortugalCategoryPageComponent);

PortugalCategoryPage.loadData = () => {

  return categoryListings({
    bounds: PORTUGAL_BOUNDS,
    page: 1,
    perPage: 100,
    include: ['author', 'images'],
    'fields.listing': ['title', 'geolocation', 'price'],
    'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
    'limit.images': 1,
  });
};

export default PortugalCategoryPage;