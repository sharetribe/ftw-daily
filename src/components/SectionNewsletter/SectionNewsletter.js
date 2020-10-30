import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import {NewsletterForm } from '../../forms';

import css from './SectionNewsletter.css';

const SectionNewsletter = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  const handleNewsletterSignup = values => {
    console.log('newsletter button clicked.')
    // const { email, ...rest } = values;
    // const params = { email: email.trim(), ...rest };
    // submitSignup(params);
  };

  return (
    <div className={classes}>
      <div className={css.container}>
        <div className={css.title}>
          <FormattedMessage id="SectionNewsletter.title" />
        </div>
        <div className={css.txtDiv} >
          <p>
            <FormattedMessage id="SectionNewsletter.text"/>
          </p>
        </div>
        <div className={css.formDiv}>
          <NewsletterForm
            className={css.form}
            onSubmit={handleNewsletterSignup}
            inProgress={false}
            // onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
          />
        </div>
      </div>
    </div>
  );
};

SectionNewsletter.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionNewsletter.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionNewsletter;
