import React, { PropTypes } from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { NamedLink, ResponsiveImage } from '../../components';
import * as propTypes from '../../util/propTypes';
import { convertMoneyToNumber } from '../../util/currency';
import { ensureListing, ensureUser } from '../../util/data';

import css from './ListingCard.css';

const priceData = (price, currencyConfig, intl) => {
  if (price && price.currency === currencyConfig.currency) {
    const priceAsNumber = convertMoneyToNumber(price, currencyConfig.subUnitDivisor);
    const formattedPrice = intl.formatNumber(priceAsNumber, currencyConfig);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

export const ListingCardComponent = props => {
  const { className, rootClassName, currencyConfig, intl, listing } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price } = currentListing.attributes;
  const slug = encodeURIComponent(title.split(' ').join('-'));
  const author = ensureUser(listing.author);
  const authorName = `${author.attributes.profile.firstName} ${author.attributes.profile.lastName}`;
  const firstImage = currentListing.images && currentListing.images.length > 0
    ? currentListing.images[0]
    : null;

  // TODO: Currently, API can return currencies that are not supported by starter app.
  const { formattedPrice, priceTitle } = priceData(price, currencyConfig, intl);

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
            <FormattedMessage id="ListingCard.perNight" />
          </div>
        </div>
        <div className={css.mainInfo}>
          <div className={css.title}>
            {title}
          </div>
          <div className={css.authorInfo}>
            <FormattedMessage
              className={css.authorName}
              id="ListingCard.hostedBy"
              values={{ authorName }}
            />
          </div>
        </div>
      </div>
    </NamedLink>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
};

const { string } = PropTypes;

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  currencyConfig: propTypes.currencyConfig.isRequired,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,
};

export default injectIntl(ListingCardComponent);
