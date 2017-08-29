import React from 'react';
import { types as sdkTypes } from '../../util/sdkLoader';
import ImageCarousel from './ImageCarousel';

const { UUID } = sdkTypes;

// TODO: change these when the API returns images with the original aspect ratio
const imageName = 'landscape-crop';
const imageName2x = 'landscape-crop2x';

const imageSquare = {
  id: new UUID('image-square'),
  type: 'image',
  attributes: {
    sizes: [
      {
        name: imageName,
        width: 400,
        height: 400,
        url: 'https://via.placeholder.com/400x400',
      },
      {
        name: imageName2x,
        width: 800,
        height: 800,
        url: 'https://via.placeholder.com/800x800',
      },
    ],
  },
};

const imagePortrait = {
  id: new UUID('image-portrait'),
  type: 'image',
  attributes: {
    sizes: [
      {
        name: imageName,
        width: 400,
        height: 800,
        url: 'https://via.placeholder.com/400x800',
      },
      {
        name: imageName2x,
        width: 800,
        height: 1600,
        url: 'https://via.placeholder.com/800x1600',
      },
    ],
  },
};
const imageLandscape = {
  id: new UUID('image-landscape'),
  type: 'image',
  attributes: {
    sizes: [
      {
        name: imageName,
        width: 400,
        height: 200,
        url: 'https://via.placeholder.com/400x200',
      },
      {
        name: imageName2x,
        width: 800,
        height: 400,
        url: 'https://via.placeholder.com/800x400',
      },
    ],
  },
};

const ImageCarouselWrapper = props => {
  const wrapperStyles = {
    width: '100%',
    height: 400,
    backgroundColor: '#000',
  };
  return (
    <div style={wrapperStyles}>
      <ImageCarousel {...props} />
    </div>
  );
};

export const NoImages = {
  component: ImageCarouselWrapper,
  props: { images: [] },
};

export const SingleImage = {
  component: ImageCarouselWrapper,
  props: { images: [imageSquare] },
};

export const MultipleImages = {
  component: ImageCarouselWrapper,
  props: { images: [imageLandscape, imagePortrait, imageSquare] },
};
