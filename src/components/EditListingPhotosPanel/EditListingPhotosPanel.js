import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
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
    console.log('EditListingPhotosPanel.handleSubmit():', values);
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
    const params = {
      firstName,
      lastName,
      birthDate,
      bankAccountToken,
      address: {
        country,
        city,
        addressLine: streetAddress && streetAddress.selectedPlace
          ? streetAddress.selectedPlace.address
          : null,
        postalCode,
      },
    };
    console.log('payout details:', params, 'state:', this.state);
  }
  render() {
    const {
      className,
      rootClassName,
      images,
      onImageUpload,
      onUpdateImageOrder,
      togglePageClassNames,
    } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className);
    const currency = config.currencyConfig.currency;

    const payoutDetailsModal = (
      <Modal
        className={css.payoutModal}
        isOpen={this.state.showPayoutDetails}
        onClose={this.handlePayoutModalClose}
        togglePageClassNames={togglePageClassNames}
      >
        <PayoutDetailsForm currency={currency} onSubmit={this.handlePayoutSubmit} />
      </Modal>
    );

    return (
      <div className={classes}>
        {payoutDetailsModal}
        <h1><FormattedMessage id="EditListingPhotosPanel.title" /></h1>
        <EditListingPhotosForm
          initialValues={{ images }}
          images={images}
          onImageUpload={onImageUpload}
          onSubmit={this.handlePhotosSubmit}
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
  togglePageClassNames: func.isRequired,
};

export default EditListingPhotosPanel;
