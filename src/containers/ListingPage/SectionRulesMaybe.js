import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './SectionRulesMaybe.module.css';

const SectionRulesMaybe = props => {
  const { className, rootClassName, publicData } = props;
  const classes = classNames(rootClassName || css.root, className);
  return publicData && publicData.rules ? (
    <div className={classes}>
      <h2 className={css.title}>
        <FormattedMessage id="ListingPage.rulesTitle" />
      </h2>
      <p className={css.rules}>{publicData.rules}</p>
    </div>
  ) : null;
};

SectionRulesMaybe.defaultProps = { className: null, rootClassName: null };

SectionRulesMaybe.propTypes = {
  className: string,
  rootClassName: string,
  publicData: shape({
    rules: string,
  }),
};

export default SectionRulesMaybe;
