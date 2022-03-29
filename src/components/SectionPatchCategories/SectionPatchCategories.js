import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionPatchCategories.module.css';

// import hairBeautyImage from       './images/hair_beauty.jpg';
// import fitnessWellnessImage from  './images/fitness_wellness.jpg';
// import studioSpaceImage from      './images/studio_space.jpg';
// import eventSpaceImage from       './images/event_space.jpg';
// import coworkingImage from        './images/coworking.jpg';

import coworkingImage from        './newImages/coworking.jpg';
import events_venuesImage from        './newImages/events_venues.jpg';
import fitnessImage from        './newImages/fitness.jpg';
import hair_beautyImage from        './newImages/hair_beauty.jpg';
import kitchen_popUpsImage from        './newImages/kitchen_popUps.jpg';
import music_artsImage from        './newImages/music_arts.jpg';
import photography_filmImage from        './newImages/photography_film.jpg';
import wellnessImage from        './newImages/wellness.jpg';

const locationParams =            '?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741';

const hairBeautyUrlParams =       `&pub_category=has_any%3Ahair-stylist%2Cbarber%2Cmakeup-artist%2Cnail-technician%2Ccosmetics%2Caesthetics%2Ctattoo-and-piercing`;
const wellnessUrlParams =  `&pub_category=has_any%3Atherapy-room%2Cmassage-room%2Cclinical-room`;
const fitnessUrlParams =  `&pub_category=has_any%3Afitness%2Cyoga-studio%2Cdance-studio%2Csports-hall%2Coutdoor-sport-space%2Cactivity-room`;
const photographyAndFilmUrlParams =  `&pub_category=has_any%3Alocation-shoot%2Coutdoor-site%2Cphotography`;
const coworkingUrlParams =  `&pub_category=has_any%3Adesk-space%2Coffice-space%2Cmeeting-room-space%2Cconference-room%2Cclassroom`;
const musicAndArtsUrlParams =  `&pub_category=has_any%3Amusic-studio%2Crecording-studio%2Cgallery-space%2Cart-studio%2Crehearsal-space%2Cdrama-studio%2Ctheatre-space`;
const eventsAndVenuesUrlParams =  `&pub_category=has_any%3Amusic-venue%2Cprivate-event-space%2Csports-venue%2Cconference-exhibition%2Coutdoor-events%2Cprivate-dining`;
const kitchensAndPopUpsUrlParams =  `&pub_category=has_any%3Akitchen-space%2Cpop-up-space`;


class CategoryImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(CategoryImage);

const categoryLink = (name, image, searchQuery) => {
  const nameText = <span className={css.categoryName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: locationParams + searchQuery }} className={css.category}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.categoryImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionPatchCategories.categoriesInLocation"
          values={{ category: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionPatchCategories = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionPatchCategories.title" />
      </div>
      {/*<div className={css.categories}>*/}
      {/*  {categoryLink('Hair & Beauty', hairBeautyImage, hairBeautyUrlParams)}*/}
      {/*  {categoryLink('Fitness & Wellness', fitnessWellnessImage, fitnessWellnessUrlParams)}*/}
      {/*  {categoryLink('Studio Space', studioSpaceImage, studioSpaceUrlParams)}*/}
      {/*  {categoryLink('Event Space', eventSpaceImage, eventSpaceUrlParams)}*/}
      {/*  {categoryLink('Coworking', coworkingImage, coworkingUrlParams)}*/}
      {/*</div>*/}
      <div className={css.categories}>
        {categoryLink('Hair & Beauty', hair_beautyImage, hairBeautyUrlParams)}
        {categoryLink('Wellness', wellnessImage, wellnessUrlParams)}
        {categoryLink('Fitness', fitnessImage, fitnessUrlParams)}
        {categoryLink('Photography & Film', photography_filmImage, photographyAndFilmUrlParams)}
      </div>
      <div className={css.categories}>
        {categoryLink('Coworking & Office', coworkingImage, coworkingUrlParams)}
        {categoryLink('Music & Arts', music_artsImage, musicAndArtsUrlParams)}
        {categoryLink('Events  & Venues', events_venuesImage, eventsAndVenuesUrlParams)}
        {categoryLink('Kitchen & Pop-ups', kitchen_popUpsImage, kitchensAndPopUpsUrlParams)}
      </div>
    </div>
  );
};

SectionPatchCategories.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionPatchCategories.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionPatchCategories;
