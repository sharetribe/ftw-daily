import React from "react";
import { FormattedMessage } from '../../util/reactIntl';
import css from './SectionTestimonials.module.css';

export const testimonialSection = (content, author, job, location) => {
  return (
    <div className={css.testimonial}>
      <p className={css.quote}>{content}</p>
       <div className={css.testimonialAuthorDiv}>
        <span>
          <p>{author}</p>
          <p>{job}</p>
          <p>{location}</p>
        </span>
      </div>
    </div>
  );
};

export const quote1 = <FormattedMessage id="SectionTestimonials.quote4" />;
export const author1 = <FormattedMessage id="SectionTestimonials.author4" />;
export const authorJob1 = <FormattedMessage id="SectionTestimonials.authorJob4" />;
export const authorLoc1 = <FormattedMessage id="SectionTestimonials.authorLoc4" />;
export const quote2 = <FormattedMessage id="SectionTestimonials.quote2" />;
export const author2 = <FormattedMessage id="SectionTestimonials.author2" />;
export const authorJob2 = <FormattedMessage id="SectionTestimonials.authorJob2" />;
export const authorLoc2 = <FormattedMessage id="SectionTestimonials.authorLoc2" />;
export const quote3 = <FormattedMessage id="SectionTestimonials.quote6" />;
export const author3 = <FormattedMessage id="SectionTestimonials.author6" />;
export const authorJob3 = <FormattedMessage id="SectionTestimonials.authorJob6" />;
export const authorLoc3 = <FormattedMessage id="SectionTestimonials.authorLoc6" />;
export const quote4 = <FormattedMessage id="SectionTestimonials.quote5" />;
export const author4 = <FormattedMessage id="SectionTestimonials.author5" />;
export const authorJob4 = <FormattedMessage id="SectionTestimonials.authorJob5" />;
export const authorLoc4 = <FormattedMessage id="SectionTestimonials.authorLoc5" />;
