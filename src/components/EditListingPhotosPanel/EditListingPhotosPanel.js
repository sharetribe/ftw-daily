import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { EditListingPhotosForm } from '../../containers';

import css from './EditListingPhotosPanel.css';

const EditListingPhotosPanel = props => {
  const {
    className,
    rootClassName,
    images,
    onImageUpload,
    onSubmit,
    onUpdateImageOrder,
    stripeConnected,
  } = props;

  const rootClass = rootClassName || css.root;
  const classes = classNames(rootClass, className);

  // TODO This will be defined in the stripe popup form later.
  const country = 'US';

  return (
    <div className={classes}>
      <h1><FormattedMessage id="EditListingPhotosPanel.title" /></h1>
      <EditListingPhotosForm
        initialValues={{ country, images }}
        images={images}
        onImageUpload={onImageUpload}
        onSubmit={onSubmit}
        onUpdateImageOrder={onUpdateImageOrder}
        stripeConnected={stripeConnected}
      />
    </div>
  );
};

const { array, bool, func, string } = PropTypes;

EditListingPhotosPanel.defaultProps = {
  className: null,
  rootClassName: null,
  images: [],
};

EditListingPhotosPanel.propTypes = {
  className: string,
  rootClassName: string,
  images: array,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  stripeConnected: bool.isRequired,
};

export default EditListingPhotosPanel;
