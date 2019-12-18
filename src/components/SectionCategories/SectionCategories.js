import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '..';

import css from './SectionCategories.css';

import babysitterImage from './images/babysitters.jpg';
import childminderImage from './images/childminders.jpg';
import nannyImage from './images/nannies.jpg';
import maternityNurseImage from './images/maternity-nurses.jpg';
import vouchersImage from './images/vouchers.jpg';

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
      <div className={css.linkText}>{nameText}</div>
    </NamedLink>
  );
};

const vouchersLink = () => {
  return (
    <a href="https://mailchi.mp/ff51d27655af/oogo-vouchers" className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={vouchersImage} alt={'Vouchers'} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <span className={css.locationName}>Vouchers</span>
      </div>
    </a>
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
        {categoryLink('Babysitters', babysitterImage, 'pub_category=babysitter')}
        {categoryLink('Childminders', childminderImage, 'pub_category=childminder')}
        {categoryLink('Nannies', nannyImage, 'pub_category=nanny')}
        {categoryLink('Maternity Nurses', maternityNurseImage, 'pub_category=maternity_nurse')}
        {vouchersLink()}
      </div>
      <div className={css.locationRequest}>
        Don’t see your area?
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
