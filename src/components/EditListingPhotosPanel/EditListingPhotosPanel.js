import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { omitBy, isUndefined } from 'lodash';
import { EditListingPhotosForm, PayoutDetailsForm } from '../../containers';
import { Modal } from '../../components';
import * as propTypes from '../../util/propTypes';
import config from '../../config';

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
      onImageUpload,
      onUpdateImageOrder,
      onManageDisableScrolling,
    } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className, {
      [css.payoutModalOpen]: this.state.showPayoutDetails,
    });
    const currency = config.currencyConfig.currency;

    return (
      <div className={classes}>
        <h1><FormattedMessage id="EditListingPhotosPanel.title" /></h1>
        <EditListingPhotosForm
          className={css.form}
          disabled={fetchInProgress}
          errors={errors}
          initialValues={{ images }}
          images={images}
          onImageUpload={onImageUpload}
          onSubmit={this.handlePhotosSubmit}
          onUpdateImageOrder={onUpdateImageOrder}
          saveActionMsg={<FormattedMessage id="EditListingPhotosPanel.publishListing" />}
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
            currency={currency}
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
  currentUser: null,
};

EditListingPhotosPanel.propTypes = {
  className: string,
  rootClassName: string,
  currentUser: propTypes.currentUser,
  errors: shape({
    createListingsError: object,
    showListingsError: object,
    uploadImageError: object,
  }),
  fetchInProgress: bool.isRequired,
  images: array,
  onImageUpload: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  onManageDisableScrolling: func.isRequired,
};

export default EditListingPhotosPanel;
