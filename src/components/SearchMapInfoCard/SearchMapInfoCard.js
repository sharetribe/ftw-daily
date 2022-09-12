import React, { Component } from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing, getLowestPrice } from '../../util/data';
import { ResponsiveImage } from '../../components';

import css from './SearchMapInfoCard.module.css';
import { types as sdkTypes } from '../../util/sdkLoader';

const { Money } = sdkTypes;

// ListingCard is the listing info without overlayview or carousel controls
const ListingCard = props => {
  const { className, clickHandler, intl, isInCarousel, listing, urlToListing, activePrice } = props;

  const { title } = listing.attributes;
  // const formattedPrice =
  //   price && price.currency === config.currency ? formatMoney(intl, price) : price.currency;

  const {key: priceType, value: {amount, currency}} = getLowestPrice(listing, activePrice);

  const formattedPrice = amount && currency && (currency === config.currency || currency === config.additionalCurrency) ? formatMoney(intl, new Money(amount, currency)) : config.currency;

  const unitTranslation = amount && currency ? ` / ${intl.formatMessage({id: `SearchMapInfoCard.${priceType}`})}` : '';

  const firstImage = listing.images && listing.images.length > 0 ? listing.images[0] : null;

  // listing card anchor needs sometimes inherited border radius.
  const classes = classNames(
    css.anchor,
    css.borderRadiusInheritTop,
    { [css.borderRadiusInheritBottom]: !isInCarousel },
    className
  );

  return (
    <a
      alt={title}
      className={classes}
      href={urlToListing}
      onClick={e => {
        e.preventDefault();
        // Use clickHandler from props to call internal router
        clickHandler(listing);
      }}
    >
      <div
        className={classNames(css.card, css.borderRadiusInheritTop, {
          [css.borderRadiusInheritBottom]: !isInCarousel,
        })}
      >
        <div className={classNames(css.threeToTwoWrapper, css.borderRadiusInheritTop)}>
          <div className={classNames(css.aspectWrapper, css.borderRadiusInheritTop)}>
            <ResponsiveImage
              rootClassName={classNames(css.rootForImage, css.borderRadiusInheritTop)}
              alt={title}
              noImageMessage={intl.formatMessage({ id: 'SearchMapInfoCard.noImage' })}
              image={firstImage}
              variants={['landscape-crop', 'landscape-crop2x']}
              sizes="250px"
            />
          </div>
        </div>
        <div className={classNames(css.info, { [css.borderRadiusInheritBottom]: !isInCarousel })}>
          <div className={css.price}>{formattedPrice}{unitTranslation}</div>
          <div className={css.name}>{title}</div>
        </div>
      </div>
    </a>
  );
};

ListingCard.defaultProps = {
  className: null,
};

ListingCard.propTypes = {
  className: string,
  listing: propTypes.listing.isRequired,
  clickHandler: func.isRequired,
  intl: intlShape.isRequired,
  isInCarousel: bool.isRequired,
};

class SearchMapInfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = { currentListingIndex: 0 };
  }

  render() {
    const {
      className,
      rootClassName,
      intl,
      listings,
      createURLToListing,
      onListingInfoCardClicked,
      activePrice
    } = this.props;
    const currentListing = ensureListing(listings[this.state.currentListingIndex]);
    const hasCarousel = listings.length > 1;
    const pagination = hasCarousel ? (
      <div className={classNames(css.paginationInfo, css.borderRadiusInheritBottom)}>
        <button
          className={css.paginationPrev}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            this.setState(prevState => ({
              currentListingIndex:
                (prevState.currentListingIndex + listings.length - 1) % listings.length,
            }));
          }}
        />
        <div className={css.paginationPage}>
          {`${this.state.currentListingIndex + 1}/${listings.length}`}
        </div>
        <button
          className={css.paginationNext}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            this.setState(prevState => ({
              currentListingIndex:
                (prevState.currentListingIndex + listings.length + 1) % listings.length,
            }));
          }}
        />
      </div>
    ) : null;

    const classes = classNames(rootClassName || css.root, className);
    const caretClass = classNames(css.caret, { [css.caretWithCarousel]: hasCarousel });

    return (
      <div className={classes}>
        <div className={css.caretShadow} />
        <ListingCard
          clickHandler={onListingInfoCardClicked}
          urlToListing={createURLToListing(currentListing)}
          listing={currentListing}
          intl={intl}
          isInCarousel={hasCarousel}
          activePrice={activePrice}
        />
        {pagination}
        <div className={caretClass} />
      </div>
    );
  }
}

SearchMapInfoCard.defaultProps = {
  className: null,
  rootClassName: null,
};

SearchMapInfoCard.propTypes = {
  className: string,
  rootClassName: string,
  listings: arrayOf(propTypes.listing).isRequired,
  onListingInfoCardClicked: func.isRequired,
  createURLToListing: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(injectIntl)(SearchMapInfoCard);
