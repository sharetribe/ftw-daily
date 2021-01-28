import React from 'react';
import { ResponsiveImage } from '../../components';
import ActionBarMaybe from './ActionBarMaybe';

import css from './ListingPage.module.css';

const SectionListImages = props => {
  const {
    title,
    listing,
    isOwnListing,
    editParams,
    handlePhotosClick,
  } = props;

  const hasImages = listing.images && listing.images.length > 0;
  
  const image = listing.images.map((item, index) => {
      return (
          <ResponsiveImage
          onClick={(e) => handlePhotosClick(e, index)}
          key={index}
          rootClassName={css.rootForImage}
          alt={title}
          image={item}
          variants={[
            'landscape-crop',
            'landscape-crop2x',
            'landscape-crop4x',
            'landscape-crop6x',
          ]}
        />
      )
  });
  const firstImage = hasImages ? image : null;

  // Action bar is wrapped with a div that prevents the click events
  // to the parent that would otherwise open the image carousel
  const actionBar = listing.id ? (
    <div onClick={e => e.stopPropagation()}>
      <ActionBarMaybe isOwnListing={isOwnListing} listing={listing} editParams={editParams} />
    </div>
  ) : null;

  return (
    <div className={css.sectionListImages}>
      <div className={css.imageWrapper}>
        <div className={css.listImageContent}>
          {actionBar}
          {firstImage}
        </div>
      </div>
    </div>
  );
};

export default SectionListImages;
