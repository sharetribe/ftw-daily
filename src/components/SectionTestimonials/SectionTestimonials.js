import React from 'react';
import AliceCarousel from "react-alice-carousel";
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

import "react-alice-carousel/lib/alice-carousel.css";
import css from './SectionTestimonials.css';

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
          <MobileTestimonials />
        </div>
        <div className={css.testimonials}>
          {testimonialSection(quote1, author1, authorJob1, authorLoc1, false)}
          {testimonialSection(quote2, author2, authorJob2, authorLoc2, true)}
          {testimonialSection(quote3, author3, authorJob3, authorLoc3, false)}
          {testimonialSection(quote4, author4, authorJob4, authorLoc4, true)}
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
