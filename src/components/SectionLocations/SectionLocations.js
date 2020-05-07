import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import helsinkiImage from './images/location_lima.jpg';
import rovaniemiImage from './images/location_arequipa.jpg';
import rukaImage from './images/location_cusco.jpg';

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
        <div className={css.aspectWrapper} id="wrapperAspect">
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
      <div className={css.linkText} id="textLink">
        <FormattedMessage
          id="SectionLocations.listingsInLocation" 
          values={{ location: nameText }}
        />
      </div>
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
          'Lima Metropolitana',
          helsinkiImage,
          '?address=Lima%2C%20Perú&bounds=-11.94376642%2C-76.87075813%2C-12.21475882%2C-77.23209704'
        )}
        {locationLink(
          'Arequipa',
          rovaniemiImage,
          '?address=s?address=Arequipa%2C%20Arequipa%2C%20Perú&bounds=-16.3736953%2C-71.5133359%2C-16.4349863%2C-71.5657969'
        )}
        {locationLink(
          'Cusco',
          rukaImage,
          '?address=s?address=Cusco%2C%20Perú&bounds=-13.45955536%2C-71.92894742%2C-13.57124394%2C-71.99672053'
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
