import React from 'react';
import AliceCarousel from "react-alice-carousel";
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import "react-alice-carousel/lib/alice-carousel.css";
import css from './SectionTestimonials.css';

import {ReactComponent as BoyIcon} from './svgs/boy.svg';
import {ReactComponent as GirlIcon} from './svgs/girl.svg';

const quote1 = <FormattedMessage id="SectionTestimonials.quote4" />;
const author1 = <FormattedMessage id="SectionTestimonials.author4" />;
const authorJob1 = <FormattedMessage id="SectionTestimonials.authorJob4" />;
const authorLoc1 = <FormattedMessage id="SectionTestimonials.authorLoc4" />;
const quote2 = <FormattedMessage id="SectionTestimonials.quote2" />;
const author2 = <FormattedMessage id="SectionTestimonials.author2" />;
const authorJob2 = <FormattedMessage id="SectionTestimonials.authorJob2" />;
const authorLoc2 = <FormattedMessage id="SectionTestimonials.authorLoc2" />;
const quote3 = <FormattedMessage id="SectionTestimonials.quote6" />;
const author3 = <FormattedMessage id="SectionTestimonials.author6" />;
const authorJob3 = <FormattedMessage id="SectionTestimonials.authorJob6" />;
const authorLoc3 = <FormattedMessage id="SectionTestimonials.authorLoc6" />;
const quote4 = <FormattedMessage id="SectionTestimonials.quote5" />;
const author4 = <FormattedMessage id="SectionTestimonials.author5" />;
const authorJob4 = <FormattedMessage id="SectionTestimonials.authorJob5" />;
const authorLoc4 = <FormattedMessage id="SectionTestimonials.authorLoc5" />;

const testimonialSection = (content, author, job, location, isMale) => {
  const Avatar = isMale ? BoyIcon : GirlIcon;
  return (
    <div className={css.testimonial}>
      <p className={css.quote}>{content}</p>
       <div className={css.testimonialAuthorDiv}>
         <div className={css.svgDiv}>
           <Avatar className={css.svg} />
         </div>
        <span>
          <p>{author}</p>
          <p>{job}</p>
          <p>{location}</p>
        </span>
      </div>
    </div>
  );
};

const MobileTestimonials = () => {
  const responsive = {
    0: { items: 1 },
    630: { items: 2 },
  };
  // const handleOnDragStart = e => e.preventDefault();
  const items = [
    testimonialSection(quote1, author1, authorJob1, authorLoc1, false),
    testimonialSection(quote2, author2, authorJob2, authorLoc2, true),
    testimonialSection(quote3, author3, authorJob3, authorLoc3, false),
    testimonialSection(quote4, author4, authorJob4, authorLoc4, true),
  ];

  return (
    <AliceCarousel
      mouseTrackingEnabled
      responsive={responsive}
      autoPlay
      autoPlayInterval={5000}
      items={items}
    />
  );
};

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
          {MobileTestimonials()}
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
