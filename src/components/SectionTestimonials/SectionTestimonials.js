import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import {
  testimonialSection,
  quote1, author1, authorJob1, authorLoc1,
  quote2, author2, authorJob2, authorLoc2,
  quote3, author3, authorJob3, authorLoc3,
  quote4, author4, authorJob4, authorLoc4,
} from './helpers';
import MobileTestimonials from './MobileTestimonials';

import css from './SectionTestimonials.module.css';

const SectionTestimonials = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.testimonialsSection}>
        <div className={css.title}>
          <FormattedMessage id="SectionTestimonials.title" />
        </div>
        <div className={css.mobileTestimonials} id="mT">
          {/* <MobileTestimonials /> */}
          {testimonialSection(quote2, author2, authorJob2, authorLoc2)}
          {testimonialSection(quote4, author4, authorJob4, authorLoc4)}
        </div>
        <div className={css.testimonials}>
          {testimonialSection(quote1, author1, authorJob1, authorLoc1)}
          {testimonialSection(quote2, author2, authorJob2, authorLoc2)}
          {testimonialSection(quote3, author3, authorJob3, authorLoc3)}
          {testimonialSection(quote4, author4, authorJob4, authorLoc4)}
        </div>
      </div>
    </div>
  );
};

SectionTestimonials.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionTestimonials.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionTestimonials;
