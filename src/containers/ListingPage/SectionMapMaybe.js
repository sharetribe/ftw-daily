import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { obfuscatedCoordinates } from '../../util/maps';
import { Map } from '../../components';
import config from '../../config';

import css from './ListingPage.css';

const SectionMapMaybe = props => {
  const { className, rootClassName, geolocation, publicData, listingId } = props;

  if (!geolocation) {
    return null;
  }

  const address = publicData.location ? publicData.location.address : '';
  const classes = classNames(rootClassName || css.sectionMap, className);

  const mapProps = config.coordinates.fuzzy
    ? { obfuscatedCenter: obfuscatedCoordinates(geolocation, listingId ? listingId.uuid : null) }
    : { address, center: geolocation };

  return (
    <div className={classes}>
      <h2 className={css.locationTitle}>
        <FormattedMessage id="ListingPage.locationTitle" />
      </h2>
      <div className={css.map}>
        <Map {...mapProps} useStaticMap />
      </div>
    </div>
  );
};

SectionMapMaybe.defaultProps = {
  rootClassName: null,
  className: null,
  geolocation: null,
  listingId: null,
};

SectionMapMaybe.propTypes = {
  rootClassName: string,
  className: string,
  geolocation: propTypes.latlng,
  listingId: propTypes.uuid,
};

export default SectionMapMaybe;
