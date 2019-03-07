import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import helsinkiImage from './images/category_portrait.jpg';
import rukaImage from './images/category_events.jpg';
import rovaniemiImage from './images/category_instaglam.jpg';


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
          'London',
          helsinkiImage,
          '?address=London%2C%20United Kingdom&bounds=51.6225%2C0.07227%2C51.4103%2C-0.2995&origin=51.509865%2C-0.118092'
        )}
        {locationLink(
          'Manchester',
          rukaImage,
          '?address=Manchester%2C%20United Kingdom&bounds=53.5462%2C-2.1426%2C53.424%2C-2.322&origin=53.483959%2C-2.244644'
        )}
        {locationLink(
          'Bristol',
          rovaniemiImage,
          '?address=Bristol%2C%20United Kingdom&bounds=51.5064%2C-2.51943719%2C51.4097%2C-2.67847513&origin=51.454514%2C-2.587910'
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
