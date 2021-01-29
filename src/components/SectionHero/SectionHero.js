import React, { Fragment, useState } from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import css from './SectionHero.module.css';

import bass from './images/bass.jpg';
import dizay from './images/dizay.jpg';
import dreadbox from './images/dreadbox.jpg';
import guitaracoutic from './images/guitaracoutic.jpg';
import guitarelectric from './images/guitarelectric.jpg';
import piano from './images/piano.jpg';

const SectionHero = props => {
  const { rootClassName, className } = props;
  const [value, setValue] = useState(0);
  const onChange = (item) => {
    setValue(item)
  }

  const classes = classNames(rootClassName || css.root, className);
  return (
    <Fragment>
      <Carousel
        onChange={onChange}
        value={value}
        slidesPerPage={3}
        slidesPerScroll={1}
        animationSpeed={1500}
        autoPlay={5000}
        stopAutoPlayOnHover
        infinite
        clickToChange
        centered
        itemWidth={920}
        offset={20}
        breakpoints={{
          1000: {
            slidesPerPage: 3,
            clickToChange: true,
            centered: true,
            infinite: true,
          },
          500: {
            slidesPerPage: 1,
            slidesPerScroll: 1,
            clickToChange: true,
            centered: true,
            infinite: true,
          },
        }}
      >
        <NamedLink
          name="SearchPage"
          to={{
            search: '',
          }}
        >
          <img src={bass} />
        </NamedLink>
        <NamedLink
          name="SearchPage"
          to={{
            search: '',
          }}
        >
          <img src={dizay} />
        </NamedLink>
        <NamedLink
          name="SearchPage"
          to={{
            search: '',
          }}
        >
          <img src={dreadbox} />
        </NamedLink>
        <NamedLink
          name="SearchPage"
          to={{
            search: '',
          }}
        >
          <img src={guitaracoutic} />
        </NamedLink>
        <NamedLink
          name="SearchPage"
          to={{
            search: '',
          }}
        >
          <img src={guitarelectric} />
        </NamedLink>
        <NamedLink
          name="SearchPage"
          to={{
            search: '',
          }}
        >
          <img src={piano} />
        </NamedLink>
      </Carousel>
      <Dots value={value} onChange={onChange} number={6} />
    </Fragment>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
