import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import helsinkiImage from './images/location_helsinki.jpg';
import rovaniemiImage from './images/location_rovaniemi.jpg';
import rukaImage from './images/location_ruka.jpg';
import skerriesImage from './images/location_skerries.jpg';
import adaremanorImage from './images/location_adaremanor.jpg';
import maynoothImage from './images/location_maynooth.jpg';
import kinsaleImage from './images/location_kinsale.jpg';
import fotaImage from './images/location_fota.jpg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionLocations.listingsInLocation"
          values={{ location: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLocations.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          'Skerries',
          skerriesImage,
          'bounds=53.586009%2C-6.099428%2C53.567828%2C-6.135285&origin=53.58%2C-6.1097'
        )}
        {locationLink(
          'Maynooth',
          maynoothImage,
          '?address=Maynooth%2C%20Ireland&bounds=53.405202%2C-6.507408%2C53.339263%2C-6.650373&origin=53.385%2C-6.5936'
        )}
        {locationLink(
          'Adare Manor',
          adaremanorImage,
          '?address=Adare%20Manor%2C%20Ireland&bounds=52.616983%2C-8.703934%2C52.543157%2C-8.856438&origin=52.56389%2C-8.79'
        )}
        {locationLink(
          'Fota Island',
          fotaImage,
          '?address=Fota%20Island%2C%20Ireland&bounds=51.956439%2C-8.18943%2C51.880051%2C-8.336577&origin=51.9083%2C-8.2633'
        )}
        {locationLink(
          'Kinsale',
          kinsaleImage,
          '?address=Kinsale%2C%20Ireland&bounds=51.759218%2C-8.450977%2C51.670687%2C-8.612987&origin=51.7075%2C-8.53056'
        )}
      </div>
      <div className={css.locationRequest}>
        Don’t see your area?{' '}
        <a className={css.locationRequestLink} href="/" title="Request your area" target="_blank">
          Request your location is added
        </a>
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
