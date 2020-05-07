import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { render } from 'react-dom';
import { fadeInUp, fadeInLeft, fadeInRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { NamedLink, ExternalLink } from '../../components';

import css from './SliderHero.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import forthSlide from './slides/forth.jpg';
import test2 from './testslides/test2.jpg';
import test5 from './testslides/test5.jpg';
import test6 from './testslides/test6.jpg';

// Import demo slides

import img1 from './test/img1.jpg';
import img2 from './test/img2.jpg';
import img3 from './test/img3.jpg';
import img4 from './test/img4.jpg';
import img5 from './test/img5.jpg';
import img6 from './test/img6.jpg';
import img7 from './test/img7.jpg';
import img8 from './test/img8.jpg';
import img9 from './test/img9.jpg';

const styles = {
  fadeInUp: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
  },
};

const stylesLeft = {
  fadeInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft'),
  },
};

const stylesRight = {
  fadeInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInRight, 'fadeInRight'),
  },
};

const SliderHero = () => (
  <Carousel interval="8000" fade={true}>
    <Carousel.Item>
      <div className={css.carouselHero}>
        <img src={test5}></img>
      </div>

      <div className={css.carouselCaption}>
        <StyleRoot>
          <div style={styles.fadeInUp}>
            <h1 style={styles.fadeInUp}>Juntos por la Reactivación del Perú</h1>

            <div className={css.submitContainer}>
              <a href="s?pub_user_type=1">Ver productos y servicios</a>
              <a href="/ordertype/new">Anuncia</a>
              <a href="/signup">Registrate</a>
              <a href="/aboutus">Nosotros</a>
            </div>
          </div>
        </StyleRoot>
      </div>
    </Carousel.Item>
{/*
    <Carousel.Item>
      <div className={css.carouselHero}>
        <img className={css.sSlide} src={forthSlide}></img>
      </div>

      <div className={css.carouselCaption}>
        <StyleRoot>
          <div style={styles.fadeInUp}>
            <h1 style={styles.fadeInUp}>Juntos por la Reactivación del Perú</h1>
            

            <div className={css.submitContainer}>
              <a href="s?pub_user_type=1">Ver productos y servicios</a>
              <a href="s?pub_user_type=0">Anuncia</a>
              <a href="s?pub_user_type=2">Registrate</a>
              <ExternalLink href="https://trustmypetsitter.seedrs.com/">
                Contacto
              </ExternalLink>
            </div>
          </div>
        </StyleRoot>
      </div>
    </Carousel.Item>

    <Carousel.Item>
      <div className={css.carouselHero}>
        <img className={css.sSlide} src={test6}></img>
      </div>

      <div className={css.carouselCaption}>
        <StyleRoot>
          <div style={styles.fadeInUp}>
            <h1 style={styles.fadeInUp}>Juntos por la Reactivación del Perú</h1>

            <div className={css.submitContainer}>
              <a href="s?pub_user_type=1">Ver productos y servicios</a>
              <a href="s?pub_user_type=0">Anuncia</a>
              <a href="s?pub_user_type=2">Registrate</a>
              <ExternalLink href="https://trustmypetsitter.seedrs.com/">
                Contacto
              </ExternalLink>
            </div>
          </div>
        </StyleRoot>
      </div>
    </Carousel.Item>

    <Carousel.Item>
      <div className={css.carouselHero}>
        <img src={test2}></img>
      </div>

      <div className={css.carouselCaption}>
        <StyleRoot>
          <div style={styles.fadeInUp}>
            <h1 style={styles.fadeInUp}>Juntos por la Reactivación del Perú</h1>

            <div className={css.submitContainer}>
              <a href="s?pub_user_type=1">Ver productos y servicios</a>
              <a href="s?pub_user_type=0">Anuncia</a>
              <a href="s?pub_user_type=2">Registrate</a>
              <ExternalLink href="https://trustmypetsitter.seedrs.com/">
                Contacto
              </ExternalLink>
            </div>
          </div>
        </StyleRoot>
      </div>
    </Carousel.Item>
*/}
   
  
  </Carousel>
);

export default SliderHero;
