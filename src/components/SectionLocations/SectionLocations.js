import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import dressurImage from './images/Dressur.png';
import freizeitImage from './images/Western.png';
import springenImage from './images/Springen.png';

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
      <h3 className={css.linkText}>
        <FormattedMessage
          id="SectionLocations.listingsInLocation"
          values={{ location: nameText }}
        />
      </h3>
    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.titleWrapper}>
        <div className={css.title}>
          <FormattedMessage id="SectionLocations.title" />
        </div>
        <div className={css.title}>
          <FormattedMessage id="SectionLocations.secondTitle" />
        </div>
      </div>
      <div className={css.subTitle}>
        <FormattedMessage id="SectionLocations.subTitle" />
      </div>
      <div className={css.locations}>
        {locationLink(
          'Springen',
          springenImage,
          '?address=Schweiz&bounds=47.808453%2C10.492064%2C45.817981%2C5.955902&pub_mainDiscipline=springen'
        )}
        {locationLink(
          'Dressur',
          dressurImage,
          '?address=Schweiz&bounds=47.808453%2C10.492064%2C45.817981%2C5.955902&pub_mainDiscipline=dressur'
        )}
        {locationLink(
          'Western',
          freizeitImage,
          '?address=Schweiz&bounds=47.808453%2C10.492064%2C45.817981%2C5.955902&pub_mainDiscipline=western'
        )}
      </div>
      <NamedLink
        name="SearchPage"
        to={{
          search:
            'address=Schweiz&bounds=47.808453%2C10.492064%2C45.817981%2C5.955902',
        }}
        className={css.bigButton}
      >
        <div>
          <FormattedMessage id="LandingPage.viewAllListingsButton" />
        </div> 
      </NamedLink>
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
