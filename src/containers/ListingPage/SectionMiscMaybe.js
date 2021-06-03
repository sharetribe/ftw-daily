import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './SectionRulesMaybe.module.css';

const SectionMiscMaybe = props => {
  const { className, rootClassName, publicData } = props;
  const classes = classNames(rootClassName || css.root, className);
  return publicData && publicData.miscAmenities ? (
    <div className={classes}>
      <h2 className={css.title}>
        <FormattedMessage id="ListingPage.miscTitle" />
      </h2>
      <p className={css.rules}>{publicData.miscAmenities}</p>
    </div>
  ) : null;
};

SectionMiscMaybe.defaultProps = { className: null, rootClassName: null };

SectionMiscMaybe.propTypes = {
  className: string,
  rootClassName: string,
  publicData: shape({
    rules: string,
  }),
};

export default SectionMiscMaybe;
