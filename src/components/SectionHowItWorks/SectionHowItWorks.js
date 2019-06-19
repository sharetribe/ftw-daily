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
      <div className={css.title}>
        Hiring the right talent for you
        <br />
        (How limelight works.)
      </div>

      <div className={css.steps}>
        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.part1Title" />
          </h2>
          <p>
          Start by searching for a location. Once you find the talent that you need, simply check the availability, book it, and make a secure payment right away.
          </p>
        </div>

        <div className={css.step}>
          <h2 className={css.stepTitle}>
            Have a great event
          </h2>
          <p>
          Meet your talent on the chosen date and. We'll handle the payment to the host after your experience.



          </p>
        </div>

        <div className={css.step}>
          <h2 className={css.stepTitle}>
           Review the service provider
          </h2>
          <p>
          If you enjoyed the experience, let others know by reviewing your service provider. Help others know where to go.
          </p>
        </div>
      </div>

      <div className={css.createListingLink}>
        <NamedLink name="NewListingPage">
         PS. You can also become a Limelight service provider in just a few clicks!
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
