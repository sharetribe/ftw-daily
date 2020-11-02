import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionPatchCategories.css';

import hairBeautyImage from './images/hair_beauty.png';
import fitnessWellnessImage from './images/fitness_wellness.png';
import studioSpaceImage from './images/studio_space.png';
import eventSpaceImage from './images/event_space.png';
import coworkingImage from './images/coworking.png';

const locationParams = '&address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741';
const hairBeautyUrlParams = '?pub_hair_and_beauty=hair-stylist%2Cbarber%2Cbeauty-space%2Cnail-station%2Cbeauty-room%2Cbeauty-treatment-room';
const fitnessWellnessUrlParams = '?pub_fitness_and_wellness=fitness-studio%2Ctherapy-room%2Cwellness-treatment-room';
const studioSpaceUrlParams = '?pub_creative_studios=photography-studio%2Cart-studio%2Cmusic-studio';
const eventSpaceUrlParams = '?pub_events_and_kitchen=event-space%2Coutdoor-site%2Cshoot-location';
const coworkingUrlParams = '?pub_coworking=coworking-space%2Cprivate-office-space%2Cmeeting-room-space';

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
    <NamedLink name="SearchPage" to={{ search: searchQuery + locationParams }} className={css.category}>
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
      <div className={css.categories}>
        {categoryLink('Hair & Beauty', hairBeautyImage, hairBeautyUrlParams)}
        {categoryLink('Fitness & Wellness', fitnessWellnessImage, fitnessWellnessUrlParams)}
        {categoryLink('Studio Space', studioSpaceImage, studioSpaceUrlParams)}
        {categoryLink('Event Space', eventSpaceImage, eventSpaceUrlParams)}
        {categoryLink('Coworking', coworkingImage, coworkingUrlParams)}
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
