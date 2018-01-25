import React from 'react';
import { object, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Map } from '../../components';

import css from './ListingPage.css';

const SectionMapMaybe = props => {
  const { className, rootClassName, geolocation, publicData } = props;
  const address = publicData.location ? publicData.location.address : '';
  const classes = classNames(rootClassName || css.locationContainer, className);

  return geolocation ? (
    <div className={classes}>
      <h2 className={css.locationTitle}>
        <FormattedMessage id="ListingPage.locationTitle" />
      </h2>
      <div className={css.map}>
        <Map center={geolocation} address={address} />
      </div>
    </div>
  ) : null;
};

SectionMapMaybe.defaultProps = { className: null, rootClassName: null };

SectionMapMaybe.propTypes = {
  className: string,
  rootClassName: string,
  geolocation: propTypes.latlng.isRequired,
  publicData: object.isRequired,
};

export default SectionMapMaybe;
