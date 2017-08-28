import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { omitBy, isUndefined } from 'lodash';
import { EditListingPhotosForm, PayoutDetailsForm } from '../../containers';
import { ensureListing } from '../../util/data';
import { Modal } from '../../components';
import * as propTypes from '../../util/propTypes';

import css from './EditListingPhotosPanel.css';

class EditListingPhotosPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedValues: null,
      showPayoutDetails: false,
    };
    this.handlePhotosSubmit = this.handlePhotosSubmit.bind(this);
    this.handlePayoutModalClose = this.handlePayoutModalClose.bind(this);
    this.handlePayoutSubmit = this.handlePayoutSubmit.bind(this);
  }

  handlePhotosSubmit(values) {
    const { onSubmit, currentUser } = this.props;
    const stripeConnected = currentUser &&
      currentUser.attributes &&
      currentUser.attributes.stripeConnected;
    if (stripeConnected) {
      onSubmit(values);
    } else {
      this.setState({
        submittedValues: values,
        showPayoutDetails: true,
      });
    }
  }

  handlePayoutModalClose() {
    this.setState({ showPayoutDetails: false });
  }

  handlePayoutSubmit(values) {
    const {
      firstName,
      lastName,
      birthDate,
      country,
      streetAddress,
      postalCode,
      city,
      bankAccountToken,
    } = values;
    const address = {
      country,
      city,
      addressLine: streetAddress,
      postalCode,
    };
    const params = {
      firstName,
      lastName,
      birthDate,
      bankAccountToken,
      address: omitBy(address, isUndefined),
    };
    this.props.onPayoutDetailsSubmit(params).then(() => {
      this.props.onManageDisableScrolling('EditListingPhotosPanel.payoutModal', false);
      this.props.onSubmit(this.state.submittedValues);
    });
  }

  render() {
    const {
      className,
      rootClassName,
      errors,
      fetchInProgress,
      images,
      listing,
      onImageUpload,
      onUpdateImageOrder,
      onManageDisableScrolling,
      submitButtonText,
      panelUpdated,
      updateInProgress,
      onChange,
      onRemoveImage,
    } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className, {
      [css.payoutModalOpen]: this.state.showPayoutDetails,
    });
    const currentListing = ensureListing(listing);
    const { title } = currentListing.attributes;
    const listingTitle = title || '';
    const panelTitle = currentListing.id
      ? <FormattedMessage id="EditListingPhotosPanel.title" values={{ listingTitle }} />
      : <FormattedMessage id="EditListingPhotosPanel.createListingTitle" />;

    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle}</h1>
        <EditListingPhotosForm
          className={css.form}
          disabled={fetchInProgress}
          errors={errors}
          initialValues={{ images }}
          images={images}
          onImageUpload={onImageUpload}
          onSubmit={this.handlePhotosSubmit}
          onChange={onChange}
          onUpdateImageOrder={onUpdateImageOrder}
          onRemoveImage={onRemoveImage}
          saveActionMsg={submitButtonText}
          updated={panelUpdated}
          updateError={errors.updateListingError}
          updateInProgress={updateInProgress}
        />
        <Modal
          id="EditListingPhotosPanel.payoutModal"
          className={css.payoutModal}
          isOpen={this.state.showPayoutDetails}
          onClose={this.handlePayoutModalClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.modalHeading}>
            <h1 className={css.payoutModalTitle}>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalTitleOneMoreThing" />
              <br />
              <FormattedMessage id="EditListingPhotosPanel.payoutModalTitlePayoutPreferences" />
            </h1>
            <p>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalInfo" />
            </p>
          </div>
          <PayoutDetailsForm
            className={css.payoutDetails}
            disabled={fetchInProgress}
            onSubmit={this.handlePayoutSubmit}
          />
        </Modal>
      </div>
    );
  }
}

const { array, bool, func, object, shape, string } = PropTypes;

EditListingPhotosPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  images: [],
  listing: null,
  currentUser: null,
};

EditListingPhotosPanel.propTypes = {
  className: string,
  rootClassName: string,
  currentUser: propTypes.currentUser,
  errors: shape({
    createListingsError: object,
    updateListingError: object,
    showListingsError: object,
    uploadImageError: object,
  }),
  fetchInProgress: bool.isRequired,
  images: array,
  listing: object, // TODO Should be propTypes.listing after API support is added.
  onImageUpload: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  onManageDisableScrolling: func.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImage: func.isRequired,
};

export default EditListingPhotosPanel;
