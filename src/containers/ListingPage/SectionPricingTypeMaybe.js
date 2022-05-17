import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { shape, string, array } from 'prop-types';
import classNames from 'classnames';
import css from './ListingPage.module.css';

const SectionPricingTypeMaybe = ({ className, rootClassName, publicData }) => {
  const classes = classNames(rootClassName || css.root, className);
  return publicData && publicData.pricingType ? (
    <div className={classes}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="ListingPage.pricingTypeTitle" />
      </h2>
      <p className={css.rules}>{publicData.pricingType}</p>
    </div>
  ) : null;
};

SectionPricingTypeMaybe.defaultProps = { className: null, rootClassName: null };

SectionPricingTypeMaybe.propTypes = {
  className: string,
  rootClassName: string,
  publicData: shape({
    tags: array,
  }),
};

export default SectionPricingTypeMaybe;
