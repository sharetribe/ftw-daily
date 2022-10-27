import React, {useEffect, useState} from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import Slider from "react-slick";

import css from './SectionHero.module.css';

import hotPatch1 from './images/newSlider/Hero 11.jpg';
import hotPatch2 from './images/newSlider/Hero 22.jpg';
import hotPatch3 from './images/newSlider/Hero 33.jpg';
import hotPatch4 from './images/newSlider/Hero 44.jpg';
import hotPatch5 from './images/newSlider/Hero 55.jpg';

import hotPatchMobile1 from './images/sliderMobile/hero 111.jpg'
import hotPatchMobile2 from './images/sliderMobile/hero 222.jpg'
import hotPatchMobile3 from './images/sliderMobile/hero 333.jpg'
import hotPatchMobile4 from './images/sliderMobile/hero 444.jpg'
import hotPatchMobile5 from './images/sliderMobile/hero 555.jpg'

const expertArr = [
  hotPatch4,
  hotPatch1,
  hotPatch5,
  hotPatch3,
  hotPatch2
];
const mobileExpertArr = [
  hotPatchMobile4,
  hotPatchMobile1,
  hotPatchMobile5,
  hotPatchMobile3,
  hotPatchMobile2
];

const SectionHero = props => {
  const { rootClassName, className } = props;

  const [ imageArr, setImageArr ] = useState(expertArr)
  useEffect( () => {
      if ( typeof window !== 'undefined' && window.innerWidth < 550) setImageArr(mobileExpertArr)
      else setImageArr(expertArr)
  },[])

  typeof window !== 'undefined' && window.addEventListener('resize', () => {
      if (window.innerWidth < 550) setImageArr(mobileExpertArr)
      else setImageArr(expertArr)
    });


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
        {imageArr && imageArr.map( el => (
            <div className={css.card} key={el}>
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
            
            <div className={classNames(css.heroButtonsContainer, css.heroButtonsContainerDesktop)}>
              <NamedLink className={css.heroButtonPink}
                name="SearchPage"
                to={{search: 'address=&bounds=81.11461448%2C91.93631978%2C-83.46463423%2C-161.18868022'}}>
                <FormattedMessage id="SectionHero.browseButton" />
              </NamedLink>
              <NamedLink name="NewListingPage" className={css.heroButton} >
                <FormattedMessage id="SectionHero.listButton" />
              </NamedLink>
            </div>
          </div>

          
          



          <div className={classNames(css.heroButtonsContainer, css.heroButtonsContainerMobile)}>
            <NamedLink className={css.heroButtonPink}
              name="SearchPage"
              to={{search: 'address=&bounds=81.11461448%2C91.93631978%2C-83.46463423%2C-161.18868022'}}>
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
