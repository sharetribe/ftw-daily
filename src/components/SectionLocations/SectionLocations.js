import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import ChicagoImage from './images/location_chicago.jpg';
import DenverImage from './images/location_denver.jpg';
import LosAngelesImage from './images/location_losangeles.jpg';

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
          'Chicago',
          ChicagoImage,
          'Chicago%2C%20Illinois%2C%20United%20States%20of%20America&bounds=42.0234323628388%2C-87.523686109734%2C41.6299229800457%2C-87.9058109309507'
        )}
        {locationLink(
          'Denver',
          DenverImage,
          's?address=Denver%2C%20Colorado%2C%20United%20States%20of%20America&bounds=39.94623402%2C-104.600299056%2C39.62371698%2C-105.193616003506'
        )}
        {locationLink(
          'Los Angeles',
          LosAngelesImage,
          '?address=Los%20Angeles%2C%20California%2C%20United%20States%20of%20America&bounds=34.161440999758%2C-118.121305008073%2C33.9018913203336%2C-118.521456965901'
        )}
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