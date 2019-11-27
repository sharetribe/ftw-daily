import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '..';

import css from './SectionCategories.css';

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

const categoryLink = (name, image, searchQuery) => {
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
          id="SectionCategories.listingsInCategory"
          values={{ category: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionCategories = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionCategories.title" />
      </div>
      <div className={css.locations}>
        {categoryLink(
          'Babysitters',
          skerriesImage,
          'category=babysitter&origin=53.58%2C-6.1097'
        )}
        {categoryLink(
          'Childminders',
          maynoothImage,
          'category=childminder&origin=53.58%2C-6.1097'
        )}
        {categoryLink(
          'Nannies',
          adaremanorImage,
          'category=nanny&origin=53.58%2C-6.1097'
        )}
        {categoryLink(
          'Maternity Nurses',
          fotaImage,
          'category=maternitynurse&origin=53.58%2C-6.1097'
        )}
        {categoryLink(
          'Vouchers',
          kinsaleImage,
          'category=voucher&origin=53.58%2C-6.1097'
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

SectionCategories.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionCategories.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionCategories;
