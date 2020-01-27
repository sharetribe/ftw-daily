import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { NamedLink } from '../../components';

import css from './SectionHowItWorks.css';

const SectionHowItWorks = props => {
  const {
    rootClassName,
    className,
    translationKey = 'SectionHowItWorks',
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id={`${translationKey}.titleLineOne`} />
        <br />
        <FormattedMessage id={`${translationKey}.titleLineTwo`} />
      </div>

      <div className={css.steps}>
        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id={`${translationKey}.part1Title`} />
          </h2>
          <p>
            <FormattedMessage id={`${translationKey}.part1Text`} />
          </p>
        </div>

        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id={`${translationKey}.part2Title`} />
          </h2>
          <p>
            <FormattedMessage id={`${translationKey}.part2Text`} />
          </p>
        </div>

        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id={`${translationKey}.part3Title`} />
          </h2>
          <p>
            <FormattedMessage id={`${translationKey}.part3Text`} />
          </p>
        </div>
      </div>

      <div className={css.createListingLink}>
        <NamedLink name="NewListingPage">
          <FormattedMessage id="SectionHowItWorks.createListingLink" />
        </NamedLink>
      </div>
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
