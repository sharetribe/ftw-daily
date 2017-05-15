import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { EditListingPhotosForm } from '../../containers';
import * as propTypes from '../../util/propTypes';

import css from './EditListingPhotosPanel.css';

class EditListingPhotosPanel extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    console.log('EditListingPhotosPanel.handleSubmit():', values); // eslint-disable-line
    const { onSubmit } = this.props;
    onSubmit(values);
  }
  render() {
    const {
      className,
      rootClassName,
      images,
      onImageUpload,
      onUpdateImageOrder,
    } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className);

    return (
      <div className={classes}>
        <h1><FormattedMessage id="EditListingPhotosPanel.title" /></h1>
        <EditListingPhotosForm
          initialValues={{ images }}
          images={images}
          onImageUpload={onImageUpload}
          onSubmit={this.handleSubmit}
          onUpdateImageOrder={onUpdateImageOrder}
        />
      </div>
    );
  }
}

const { array, func, string } = PropTypes;

EditListingPhotosPanel.defaultProps = {
  className: null,
  rootClassName: null,
  images: [],
  currentUser: null,
};

EditListingPhotosPanel.propTypes = {
  className: string,
  rootClassName: string,
  images: array,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  currentUser: propTypes.currentUser,
};

export default EditListingPhotosPanel;
