import React, { Component, PropTypes } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import config from '../../config';
import { types } from '../../util/sdkLoader';
import { convertMoneyToNumber } from '../../util/currency';
import { Button, Map, ModalInMobile, PageLayout } from '../../components';
import { getListingsById } from '../../ducks/sdk.duck';
import { showListing } from './ListingPage.duck';
import css from './ListingPage.css';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 2500;

const { UUID } = types;

const priceData = (price, currencyConfig, intl) => {
  if (price && price.currency === currencyConfig.currency) {
    const priceAsNumber = convertMoneyToNumber(price, currencyConfig.subUnitDivisor);
    const formattedPrice = intl.formatNumber(priceAsNumber, currencyConfig);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

// TODO: price unit (per x), custom fields, contact, reviews
// N.B. All the presentational content needs to be extracted to their own components
export class ListingPageComponent extends Component {
  constructor(props) {
    super(props);
    const tab = props.tab;
    this.state = {
      isBookingModalOpenOnMobile: tab && tab === 'book',
    };
  }

  render() {
    const { params, marketplaceData, showListingError, intl } = this.props;
    const currencyConfig = config.currencyConfig;
    const id = new UUID(params.id);
    const listingsById = getListingsById(marketplaceData, [id]);
    const currentListing = listingsById.length > 0 ? listingsById[0] : null;

    const attributes = currentListing ? currentListing.attributes : {};
    const {
      address = '',
      description = '',
      geolocation = null,
      price = null,
      title = '',
    } = attributes;

    const bookBtnMessage = intl.formatMessage({ id: 'ListingPage.ctaButtonMessage' }, { title });
    const { formattedPrice, priceTitle } = priceData(price, currencyConfig, intl);
    const map = geolocation ? <Map center={geolocation} address={address} /> : null;

    // TODO Responsive image-objects need to be thought through when final image sizes are known
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
      <PageLayout title={`${title} ${formattedPrice}`} className={this.state.rootClasses}>
        <div className={css.listing}>
          <div className={css.header}>
            <h1 className={css.title}>{title}</h1>
            <div className={css.price} title={priceTitle}>{formattedPrice}</div>
          </div>
          {imageCarousel}
          {/* eslint-disable react/no-danger */}
          <div className={css.description} dangerouslySetInnerHTML={{ __html: description }} />
          {/* eslint-enable react/no-danger */}
          <ModalInMobile
            isModalOpenOnMobile={this.state.isBookingModalOpenOnMobile}
            onClose={() => this.setState({ isBookingModalOpenOnMobile: false })}
            showAsModalMaxWidth={MODAL_BREAKPOINT}
            title={bookBtnMessage}
          >
            <span>ModalInMobile content</span>
          </ModalInMobile>
          {map ? <div className={css.map}>{map}</div> : null}
          <div className={css.openDatePickerForm}>
            <Button onClick={() => this.setState({ isBookingModalOpenOnMobile: true })}>
              {bookBtnMessage}
            </Button>
          </div>
        </div>
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

ListingPageComponent.defaultProps = {
  showListingError: null,
  tab: 'listing',
};

const { instanceOf, object, oneOf, shape, string } = PropTypes;

ListingPageComponent.propTypes = {
  intl: intlShape.isRequired,
  marketplaceData: object.isRequired,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
  }).isRequired,
  showListingError: instanceOf(Error),
  tab: oneOf(['book', 'listing']),
};

const mapStateToProps = state => ({
  marketplaceData: state.data,
  showListingError: state.ListingPage.showListingError,
});

const ListingPage = connect(mapStateToProps)(injectIntl(ListingPageComponent));

ListingPage.loadData = params => {
  const id = new UUID(params.id);
  return showListing(id);
};

export default ListingPage;
