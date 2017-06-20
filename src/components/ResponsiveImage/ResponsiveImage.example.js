import React from 'react';
import ResponsiveImage from './ResponsiveImage';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './ResponsiveImage.example.css';

const { UUID } = sdkTypes;

const ResponsiveImageWrapper = props => {
  return (
    <div className={css.root}>
      <ResponsiveImage {...props} />
    </div>
  );
};

const ResponsiveImageWrapperWithAspectRatio = props => {
  return (
    <div className={css.root}>
      <div className={css.aspectWrapper}>
        <ResponsiveImage {...props} rootClassName={css.rootForImageWithAspectRatio} />
      </div>
    </div>
  );
};

/* Image without aspect ratio wrapper */
export const Image2X = {
  component: ResponsiveImageWrapper,
  props: {
    alt: 'img',
    image: {
      id: new UUID('empty'),
      type: 'image',
      attributes: {
        sizes: [
          {
            name: 'crop',
            width: 200,
            height: 133,
            url: 'https://via.placeholder.com/200x133',
          },
          {
            name: 'crop2x',
            width: 400,
            height: 266,
            url: 'https://via.placeholder.com/400x266',
          },
        ],
      },
    },
    nameSet: [
      {
        name: 'crop',
        size: '1x',
      },
      {
        name: 'crop2x',
        size: '2x',
      },
    ],
  },
};

/* Image with aspect ratio wrapper */
export const Image2XAspect = {
  component: ResponsiveImageWrapperWithAspectRatio,
  props: {
    alt: 'img',
    image: {
      id: new UUID('empty'),
      type: 'image',
      attributes: {
        sizes: [
          {
            name: 'crop',
            width: 200,
            height: 133,
            url: 'https://via.placeholder.com/200x133',
          },
          {
            name: 'crop2x',
            width: 400,
            height: 266,
            url: 'https://via.placeholder.com/400x266',
          },
        ],
      },
    },
    nameSet: [
      {
        name: 'crop',
        size: '1x',
      },
      {
        name: 'crop2x',
        size: '2x',
      },
    ],
  },
};

/* Image with aspect ratio wrapper and wrong aspect */
export const Image2XWrongAspect = {
  component: ResponsiveImageWrapperWithAspectRatio,
  props: {
    alt: 'img',
    image: {
      id: new UUID('empty'),
      type: 'image',
      attributes: {
        sizes: [
          {
            name: 'crop',
            width: 200,
            height: 133,
            url: 'https://via.placeholder.com/200x200',
          },
          {
            name: 'crop2x',
            width: 400,
            height: 266,
            url: 'https://via.placeholder.com/400x400',
          },
        ],
      },
    },
    nameSet: [
      {
        name: 'crop',
        size: '1x',
      },
      {
        name: 'crop2x',
        size: '2x',
      },
    ],
  },
};

export const Image2XWrongAspectNoWrapper = {
  component: ResponsiveImage,
  props: {
    alt: 'img',
    image: {
      id: new UUID('empty'),
      type: 'image',
      attributes: {
        sizes: [
          {
            name: 'crop',
            width: 200,
            height: 133,
            url: 'https://via.placeholder.com/200x200',
          },
          {
            name: 'crop2x',
            width: 400,
            height: 266,
            url: 'https://via.placeholder.com/400x400',
          },
        ],
      },
    },
    nameSet: [
      {
        name: 'crop',
        size: '1x',
      },
      {
        name: 'crop2x',
        size: '2x',
      },
    ],
  },
};

/* No image without aspect ratio wrapper */
export const ImageEmpty = {
  component: ResponsiveImageWrapper,
  props: {
    alt: 'img',
    image: null,
  },
};

/* No image with aspect ratio wrapper */
export const ImageEmptyWithAspect = {
  component: ResponsiveImageWrapperWithAspectRatio,
  props: {
    alt: 'img',
    image: null,
  },
};

/* Image without aspect ratio wrapper usign sizes */
const ResponsiveImageWrapperForSizes = props => (
  <div className={css.rootForSizes}>
    <div className={css.aspectWrapper}>
      <ResponsiveImage {...props} />
    </div>
  </div>
);

export const ImageWithSizes = {
  component: ResponsiveImageWrapperForSizes,
  props: {
    alt: 'img',
    image: {
      id: new UUID('empty'),
      type: 'image',
      attributes: {
        sizes: [
          {
            name: 'crop',
            width: 200,
            height: 133,
            url: 'https://via.placeholder.com/200x133',
          },
          {
            name: 'crop2x',
            width: 400,
            height: 266,
            url: 'https://via.placeholder.com/400x266',
          },
        ],
      },
    },
    nameSet: [
      {
        name: 'crop',
        size: '200w',
      },
      {
        name: 'crop2x',
        size: '400w',
      },
    ],
    sizes: '(max-width: 600px) 200px, 400px',
  },
};
