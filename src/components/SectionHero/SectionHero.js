import React, {useEffect, useState} from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import Slider from "react-slick";

import css from './SectionHero.module.css';

import hotPatch1 from './images/newSlider/Hero 1.jpg';
import hotPatch2 from './images/newSlider/Hero 2.jpg';
import hotPatch3 from './images/newSlider/Hero 3 (1).jpg';
import hotPatch4 from './images/newSlider/Hero 4 (1).jpg';
import hotPatch5 from './images/newSlider/Hero 5(1).jpg';

import hotPatchMobile1 from './images/sliderMobile/hero 111.jpg'
import hotPatchMobile2 from './images/sliderMobile/hero 222.jpg'
import hotPatchMobile3 from './images/sliderMobile/hero 333.jpg'
import hotPatchMobile4 from './images/sliderMobile/hero 444.jpg'
import hotPatchMobile5 from './images/sliderMobile/hero 555.jpg'

const expertArr = [ hotPatch1, hotPatch2, hotPatch3, hotPatch4, hotPatch5 ];
const mobileExpertArr = [ hotPatchMobile1, hotPatchMobile2, hotPatchMobile3, hotPatchMobile4, hotPatchMobile5 ];

const SectionHero = props => {
  const { rootClassName, className } = props;

  const [ imageArr, setImageArr ] = useState(expertArr)
  useEffect( () => {
    resizeFunc()
  },[])
  const resizeFunc = () => {
    window.addEventListener('resize', () => {
      console.log('window.innerWidth', window.innerWidth)
      if (window.innerWidth < 550) {
        setImageArr(mobileExpertArr)
      } else {
        setImageArr(expertArr)
      }
    });
  }

  console.log('imageArr', imageArr)
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
