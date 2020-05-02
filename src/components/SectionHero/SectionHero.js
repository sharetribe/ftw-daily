import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { NamedLink, HeroSearch, HeroImages } from '../../components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Helmet from 'react-helmet';

import css from './SectionHero.css';
import 'react-day-picker/lib/style.css';

const SectionHero = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <div className={css.heroHalf}>
        <h1 className={css.heroMainTitle}>
          <span>Love Pets ♥ Love Travel</span>
        </h1>
        <p className={css.seperatorText}>Dogs | Cats | Rabbits | Reptiles | Pet Birds | Aquarium | Poultry</p>

        {/*

        <HeroSearch />

        */}


         <div className={css.submitContainer}>
         
            <a href="/s?pub_user_type=1">Find a Pet Sitter</a> 
            <a href="/s?pub_user_type=0">Find Homes to Sit</a>
          </div>

        </div>

          {/*

          <HeroImages />

          */}

      </div>
       <Helmet>
          <style>{`
.DayPickerInput-OverlayWrapper {
  bottom: 385px !important;
}
`}</style>
        </Helmet>
    </div>

  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
