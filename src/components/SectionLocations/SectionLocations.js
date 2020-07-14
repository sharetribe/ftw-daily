import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import pivotpowerImage from '../../containers/ProductPage/img/PivotPower_Image.png';
import alignImage from '../../containers/ProductPage/img/Align_Image.png';

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
    <NamedLink name="ProductPage" className={css.location}>
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
    // <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      // <div className={css.imageWrapper}>
      //   <div className={css.aspectWrapper}>
      //     <LazyImage src={image} alt={name} className={css.locationImage} />
      //   </div>
      // </div>
      // <div className={css.linkText}>
      //   <FormattedMessage
      //     id="SectionLocations.listingsInLocation"
      //     values={{ location: nameText }}
      //   />
      // </div>
    // </NamedLink>
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
          'Pivot Power',
          pivotpowerImage,
          '?address=Helsinki%2C%20Finland&bounds=60.2978389%2C25.254484899999966%2C59.9224887%2C24.782875800000056&origin=60.16985569999999%2C24.93837910000002'
        )}
        {locationLink(
          'Align',
          alignImage,
          '?address=Rovaniemi%2C%20Finland&bounds=67.18452510000002%2C27.32667850000007%2C66.1553745%2C24.736871199999996&origin=66.50394779999999%2C25.729390599999988'
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
