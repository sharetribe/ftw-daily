import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { NamedLink } from '../../components';

import css from './SectionHowItWorks.css';

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.section}>
        <div className={css.contentWrapper}>
          <div className={css.content}>
            <div className={css.title}>
              <FormattedMessage id="SectionHowItWorks.titleLineOne" />
              <br />
              <FormattedMessage id="SectionHowItWorks.titleLineTwo" />
            </div>

            <div className={css.steps}>
              <div className={css.step}>
                <h2 className={css.stepTitle}>
                  <FormattedMessage id="SectionHowItWorks.partOneTitle" />
                </h2>
                <p>
                  <FormattedMessage id="SectionHowItWorks.partOneText" />
                </p>
              </div>

              <div className={css.step}>
                <h2 className={css.stepTitle}>
                  <FormattedMessage id="SectionHowItWorks.partTwoTitle" />
                </h2>
                <p>
                  <FormattedMessage id="SectionHowItWorks.partTwoText" />
                </p>
              </div>

              <div className={css.step}>
                <h2 className={css.stepTitle}>
                  <FormattedMessage id="SectionHowItWorks.partThreeTitle" />
                </h2>
                <p>
                  <FormattedMessage id="SectionHowItWorks.partThreeText" />
                </p>
              </div>
            </div>

            <div className={css.createListingLink}>
              <NamedLink name="NewListingPage">
                <FormattedMessage id="SectionHowItWorks.createListingLink" />
              </NamedLink>
            </div>
          </div>
        </div>
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
