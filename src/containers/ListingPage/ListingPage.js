import React, { Component, PropTypes } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { types } from 'sharetribe-sdk';
import { NamedLink, PageLayout } from '../../components';
import { getListingsById } from '../../ducks/sdk.duck';
import { showListing } from './ListingPage.duck';
import css from './ListingPage.css';

const { UUID } = types;

// TODO this hard coded info needs to be removed when API supports these features
const info = {
  //title: 'Banyan Studios',
  price: '55\u20AC / day',
  images: [
    { id: 1, title: 'img1', imageUrl: 'http://placehold.it/750x470' },
    { id: 2, title: 'img2', imageUrl: 'http://placehold.it/750x470' },
    { id: 3, title: 'img3', imageUrl: 'http://placehold.it/750x470' },
    { id: 4, title: 'img4', imageUrl: 'http://placehold.it/750x470' },
    { id: 5, title: 'img5', imageUrl: 'http://placehold.it/750x470' },
  ],
  // description: `
  // <p>
  // Organic Music Production in a Sustainable, Ethical and Professional Studio.
  // </p>
  // <p>
  // Social Permaculture focuses on nourishing our environment with abundance instead of depleting it.
  // </p>
  // <p>
  // Banyan Studios is a comfortable, conscious, inspiring and creative retreat for musicians trying to convey their message through state of the art Audio & Video.
  // </p>
  // <a href="https://vimeo.com/168106603" alt="video">https://vimeo.com/168106603</a>
  // `,
  reviews: [
    {
      id: 1,
      reviewer: { avatar: 'http://placehold.it/44x44', name: 'Vesa L.', date: 'January 2017' },
      rating: 4,
      review: `
        Great studio in the New York for music professionals. Everything you need
        can be found from here and John was helpful with the right settings -
        we even got some tips for our songs! :)
        `,
    },
  ],
};

// N.B. All the presentational content needs to be extracted to their own components
export class ListingPageComponent extends Component {
  render() {
    const { params, marketplaceData, showListingError, intl } = this.props;
    const id = new UUID(params.id);
    const listingsById = getListingsById(marketplaceData, [id]);
    const currentListing = listingsById.length > 0 ? listingsById[0] : null;

    const title = currentListing ? currentListing.attributes.title : '';
    const description = currentListing ? currentListing.attributes.description : '';

    // TODO Responsive image-objects need to be thought through when final image sizes are know
    const images = currentListing && currentListing.images
      ? currentListing.images.map(i => ({ id: i.id, sizes: i.attributes.sizes }))
      : [];

    // TODO componentize
    const imageCarousel = images.length > 0
      ? <div className={css.imageContainer}>
          <img className={css.mainImage} alt={title} src={images[0].sizes[0].url} />
          <div className={css.thumbnailContainer}>
            {images.slice(1).map(image => (
              <div key={image.id.uuid} className={css.squareWrapper}>
                <div className={css.aspectWrapper}>
                  <img
                    className={css.thumbnail}
                    alt={`${title} thumbnail`}
                    src={image.sizes[0].url}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      : null;

    const pageContent = (
      <PageLayout title={`${title} ${info.price}`}>
        {imageCarousel}
        {/* eslint-disable react/no-danger */}
        <div className={css.description} dangerouslySetInnerHTML={{ __html: description }} />
        {/* eslint-enable react/no-danger */}
        <div className={css.filterSection}>
          <h1>Here will be filters (or dragons)</h1>
          <h2>Studio type</h2>
          <h2>Amenities</h2>
          <h2>Additional Services Available</h2>
          <p><strong>Studio hours:</strong> 10am - 6pm</p>
        </div>
        <a className={css.contact} href="mailto:studio.dude@mystudio.com">
          <h2>Contact studio</h2>
        </a>
        <div className={css.reviewSection}>
          <h2>Studio reviews (1)</h2>
          <div className={css.reviews}>
            {info.reviews.map(review => (
              <div key={review.id} className={css.review}>
                <p>{review.review}</p>
                <div className={css.reviewDetails}>
                  <div className={css.avatarWrapper}>
                    <img
                      className={css.avatar}
                      src={review.reviewer.avatar}
                      alt={review.reviewer.name}
                    />
                  </div>
                  <div className={css.reviewDetails}>
                    <span className={css.authorName}>{review.reviewer.name}</span><span
                      className={css.date}
                    >
                      {review.reviewer.date}
                    </span>
                  </div>
                  <div className={css.rating}>
                    review: <span>{review.rating}</span><span>/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={css.map}>Map</div>
        <NamedLink className={css.buttonLink} name="OrderDetailsPage" params={{ id: 12345 }}>
          {`Book ${title}`}
        </NamedLink>
      </PageLayout>
    );

    const loadingPageMsg = { id: 'ListingPage.loadingListingData' };
    const loadingContent = <PageLayout title={intl.formatMessage(loadingPageMsg)} />;

    const noDataMsg = { id: 'ListingPage.noListingData' };
    const noDataError = <PageLayout title={intl.formatMessage(noDataMsg)} />;
    const loadingOrError = showListingError ? noDataError : loadingContent;

    return currentListing ? pageContent : loadingOrError;
  }
}

ListingPageComponent.defaultProps = { showListingError: null };

const { shape, string, object, instanceOf } = PropTypes;

ListingPageComponent.propTypes = {
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
  }).isRequired,
  marketplaceData: object.isRequired,
  showListingError: instanceOf(Error),
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  marketplaceData: state.data,
  showListingError: state.ListingPage.showListingError,
});

const ListingPage = connect(mapStateToProps)(injectIntl(ListingPageComponent));

ListingPage.loadData = params => {
  return showListing(new UUID(params.id));
};

export default ListingPage;
