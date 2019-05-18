import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { NamedLink } from '..';

import css from './SectionWhatIs.css';

const SectionWhatIs = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionWhatIs.title" />
      </div>
      <p>
        <FormattedMessage id="SectionWhatIs.text" />
      </p>
      <div className={css.createListingLink}>
        <NamedLink name="NewListingPage">
          <FormattedMessage id="SectionHowItWorks.createListingLink" />
        </NamedLink>
      </div>
    </div>
  );
};

SectionWhatIs.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionWhatIs.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionWhatIs;
