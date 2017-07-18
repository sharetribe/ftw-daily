/**
 * MapPriceMarker is build on top of google.maps.OverlayView so that we can actually render HTML
 * to the map. Price label's width varies and therefore we can't use default fixed-size markers.
 */
import React, { PropTypes } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import config from '../../config';
import * as propTypes from '../../util/propTypes';
import { convertMoneyToNumber } from '../../util/currency';

import OverlayLayer from './OverlayLayer';
import css from './MapPriceMarker.css';

const priceLabel = (price, currencyConfig, intl) => {
  if (price && price.currency === currencyConfig.currency) {
    const priceAsNumber = convertMoneyToNumber(price, currencyConfig.subUnitDivisor);
    return intl.formatNumber(priceAsNumber, currencyConfig);
  } else if (price) {
    return intl.formatMessage(
      { id: 'MapPriceMarker.unsupportedPrice' },
      { currency: price.currency }
    );
  }
  return null;
};

const MapPriceMarker = props => {
  const { intl, listing, map, onAddOverlay } = props;
  const { price, geolocation } = listing.attributes;
  const label = priceLabel(price, config.currencyConfig, intl);

  return (
    <OverlayLayer
      id={listing.id.uuid}
      map={map}
      geolocation={geolocation}
      onAddOverlay={onAddOverlay}
    >
      <div className={css.root}>
        <div className={css.caretShadow} />
        <div className={css.priceLabel}>
          {label}
        </div>
        <div className={css.caret} />
      </div>
    </OverlayLayer>
  );
};

MapPriceMarker.defaultProps = {
  map: null,
};

const { func, object } = PropTypes;

MapPriceMarker.propTypes = {
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,
  map: object,
  onAddOverlay: func.isRequired,
};

export default injectIntl(MapPriceMarker);
