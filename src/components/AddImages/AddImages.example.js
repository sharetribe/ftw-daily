/* eslint-disable no-console */
import React, { Component } from 'react';
import findIndex from 'lodash/findIndex';
import uniqueId from 'lodash/uniqueId';
import { types as sdkTypes } from '../../util/sdkLoader';
import AddImages from './AddImages';
import css from './AddImagesExample.module.css';

const { UUID } = sdkTypes;

const getId = () => {
  return uniqueId();
};

class AddImagesTest extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      images: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const file = event.target.files[0];
    const fileId = getId();
    const imageData = { file, id: fileId, imageId: null };

    // Show loading overlay
    this.setState({
      images: this.state.images.concat([imageData]),
    });

    // Fake image uploaded state: show image thumbnail
    setTimeout(() => {
      this.setState(prevState => {
        const images = prevState.images;
        const imageIndex = findIndex(images, i => i.id === fileId);
        const updatedImage = { ...imageData, imageId: new UUID(fileId) };
        const updatedImages = [
          ...images.slice(0, imageIndex),
          updatedImage,
          ...images.slice(imageIndex + 1),
        ];
        return {
          images: updatedImages,
        };
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <AddImages
          images={this.state.images}
          savedImageAltText="Saved image"
          onRemoveImage={imageId => console.log('remove image:', imageId)}
        >
          <div className={css.addImageWrapper}>
            <div className={css.aspectRatioWrapper}>
              <label className={css.addImage} htmlFor="addImageExampleInput">
                + Add image
              </label>
              <input
                id="addImageExampleInput"
                type="file"
                accept="images/*"
                onChange={this.onChange}
                className={css.addImageInput}
              />
            </div>
          </div>
        </AddImages>
      </div>
    );
  }
}

export const Empty = {
  component: AddImagesTest,
  group: 'custom inputs',
};
