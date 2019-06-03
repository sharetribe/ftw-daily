import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import bandImage from './images/band_studio.jpg';
import soloImage from './images/solo_studio.jpg';
import allImage from './images/ab_color.png';

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
          'Band Rehearsals',
          bandImage,
          '?address=Greater%20Montreal&bounds=45.70557%2C-73.47303%2C45.41008%2C-73.9729&pub_category=Band%20Studios'
        )}
        {locationLink(
          'Solo Practice',
          soloImage,
          '?address=Greater%20Montreal&bounds=45.70557%2C-73.47303%2C45.41008%2C-73.9729&pub_category=Solo%20Studios'
        )}
        {locationLink(
          'All',
          allImage,
          '?address=Greater%20Montreal&bounds=45.70557%2C-73.47303%2C45.41008%2C-73.9729'
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
