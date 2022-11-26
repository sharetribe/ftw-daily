import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.module.css';

import wienImage from './images/wien.jpg';
import grazImage from './images/graz.jpg';
import linzImage from './images/linz.jpg';

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
          'Wien',
          wienImage,
          '?address=Wien%2C%20Wien%2C%20Österreich&bounds=48.3225389022517%2C16.5775089932135%2C48.1176450051469%2C16.1821500008094'
        )}
        {locationLink(
          'Graz',
          grazImage,
          '?address=Graz%2C%20Steiermark%2C%20Österreich&bounds=47.134501%2C15.5342%2C47.011887%2C15.349714'
        )}
        {locationLink(
          'Linz',
          linzImage,
          '?address=Linz%2C%20Oberösterreich%2C%20Österreich&bounds=48.378693%2C14.409217%2C48.211371%2C14.24572'
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
