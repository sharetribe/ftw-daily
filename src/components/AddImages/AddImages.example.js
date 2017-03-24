import React, { Component } from 'react';
import { findIndex, uniqueId } from 'lodash';
import { arrayMove } from 'react-sortable-hoc';
import { types } from '../../util/sdkLoader';
import AddImages from './AddImages';
import css from './AddImages.example.css';
import { Input } from '../../components';

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
    this.onSortEnd = this.onSortEnd.bind(this);
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
    setTimeout(
      () => {
        this.setState(prevState => {
          const { UUID } = types;
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
      },
      1000
    );
  }

  onSortEnd({ oldIndex, newIndex }) {
    const { images } = this.state;
    this.setState({
      images: arrayMove(images, oldIndex, newIndex),
    });
  }

  render() {
    return (
      <div>
        <AddImages images={this.state.images} onSortEnd={this.onSortEnd}>
          <div className={css.addImageWrapper}>
            <label className={css.addImage} htmlFor="addImageExampleInput">+ Add image</label>
            <Input
              id="addImageExampleInput"
              type="file"
              accept="images/*"
              onChange={this.onChange}
              className={css.addImageInput}
            />
          </div>
        </AddImages>
      </div>
    );
  }
}

export const Empty = {
  component: AddImagesTest,
};
