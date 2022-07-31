import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.module.css';

import brevardImage from './images/brevard_location_pic.jpeg';
import bentonvilleImage from './images/bentonville_location_pic.jpeg';
import moabImage from './images/moab_location_pic.jpeg';

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
          'Brevard, NC',
          brevardImage,
          '?address=Brevard%2C%20North%20Carolina%2C%20United%20States&bounds=35.34861%2C-82.644058%2C35.056182%2C-82.90614'
        )}
        {locationLink(
          'Bentonville, AK',
          bentonvilleImage,
          '?address=Bentonville%2C%20Arkansas%2C%20United%20States&bounds=36.472531%2C-94.13675%2C36.216762%2C-94.367823'
        )}
        {locationLink(
          'Moab, UT',
          moabImage,
          '?address=Moab%2C%20Utah%2C%20United%20States&bounds=39.082773%2C-109.052416%2C38.188071%2C-110.144848'
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
