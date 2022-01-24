import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import Slider from "react-slick";

import css from './SectionHero.module.css';

import hotPatch1 from './images/newSlider/Hero 1.jpg';
import hotPatch2 from './images/newSlider/Hero 2.jpg';
import hotPatch3 from './images/newSlider/Hero 3.jpg';
import hotPatch4 from './images/newSlider/Hero 4.jpg';
import hotPatch5 from './images/newSlider/Hero 5.jpg';

const expertArr = [ hotPatch1, hotPatch2, hotPatch3, hotPatch4, hotPatch5 ];
const SectionHero = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  const makeSpaceWork = <span className={css.bold}><FormattedMessage id="SectionHero.subTitleBold" /></span>;

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplaySpeed: 5000,
    useCSS: true,
    pauseOnHover: false
  };

  return (
    <div className={classes}>
      <Slider className={css.slider} {...settings} >
        {expertArr.map( el => (
            <div className={css.card}>
                <img src={el} alt="avatar" />
            </div>
        ))}
      </Slider>
          <div className={css.heroTitleBlock}>
            <h1 className={css.heroMainTitle}>
              <FormattedMessage id="SectionHero.title" />
            </h1>
            <h2 className={css.heroSubTitle}>
              <FormattedMessage
                id="SectionHero.subTitle"
                values={{ subText: makeSpaceWork }}
              />
            </h2>
          </div>
          <div className={css.heroButtonsContainer}>
            <NamedLink className={css.heroButtonPink}
              name="SearchPage"
              to={{search: 'address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741'}}>
              <FormattedMessage id="SectionHero.browseButton" />
            </NamedLink>
            <NamedLink name="NewListingPage" className={css.heroButton} >
              <FormattedMessage id="SectionHero.listButton" />
            </NamedLink>
          </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
