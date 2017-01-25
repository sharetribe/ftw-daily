import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import css from './HeroSection.css';

const HeroSection = props => (
  <section className={css.section}>
    <div className={css.content}>
      <div className={css.titleWrapper}>
        <div className={css.title}>
          <FormattedMessage id={'HeroSection.title'} defaultMessage={'Book Studiotime anywhere'} />
        </div>
        <div className={css.subTitle}>
          <FormattedMessage
            id={'HeroSection.subTitle'}
            defaultMessage={'The largest online community to rent music studios'}
          />
        </div>
      </div>
      <div className={css.ctaWrapper}>
        {props.children}
      </div>
    </div>
  </section>
);

HeroSection.defaultProps = { children: [] };

const { any } = PropTypes;

HeroSection.propTypes = { children: any };

export default HeroSection;
