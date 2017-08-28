import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { formatMoney } from '../../util/currency';
import { ensureListing } from '../../util/data';
import { createSlug } from '../../util/urlHelpers';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { createResourceLocatorString } from '../../util/routes';
import { NamedLink, SecondaryButton, ResponsiveImage } from '../../components';
import config from '../../config';

import css from './ManageListingCard.css';

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ManageListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ManageListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

const createURL = (flattenedRoutes, listing) => {
  const id = listing.id.uuid;
  const slug = createSlug(listing.attributes.title);
  const pathParams = { id, slug, type: 'edit', tab: 'description' };

  return createResourceLocatorString('EditListingPage', flattenedRoutes, pathParams, {});
};

export const ManageListingCardComponent = props => {
  const {
    className,
    rootClassName,
    flattenedRoutes,
    history,
    intl,
    listing,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price } = currentListing.attributes;
  const slug = createSlug(title);
  const firstImage = currentListing.images && currentListing.images.length > 0
    ? currentListing.images[0]
    : null;

  // TODO: Currently, API can return currencies that are not supported by starter app.
  const { formattedPrice, priceTitle } = priceData(price, intl);

  return (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
      <div className={css.threeToTwoWrapper}>
        <div className={css.aspectWrapper}>
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            nameSet={[
              { name: 'landscape-crop', size: '1x' },
              { name: 'landscape-crop2x', size: '2x' },
            ]}
          />
        </div>
      </div>
      <div className={css.info}>
        <div className={css.price}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.perNight}>
            <FormattedMessage id="ManageListingCard.perNight" />
          </div>
        </div>
        <div className={css.mainInfo}>
          <div className={css.title}>
            {title}
          </div>
        </div>
        <SecondaryButton
          className={css.edit}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            history.push(createURL(flattenedRoutes, listing));
          }}
        >
          <FormattedMessage id="ManageListingCard.edit" />
        </SecondaryButton>
      </div>
    </NamedLink>
  );
};

ManageListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
};

const { arrayOf, func, shape, string } = PropTypes;

ManageListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route).isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default compose(withRouter, withFlattenedRoutes, injectIntl)(ManageListingCardComponent);
