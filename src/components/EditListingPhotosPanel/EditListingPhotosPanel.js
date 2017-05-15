import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { omitBy, isUndefined } from 'lodash';
import { EditListingPhotosForm, PayoutDetailsForm } from '../../containers';
import { Modal } from '../../components';
import * as propTypes from '../../util/propTypes';
import config from '../../config';
import { createStripeAccount } from '../../ducks/user.duck';

import css from './EditListingPhotosPanel.css';

class EditListingPhotosPanelComponent extends Component {
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
      this.props.onSubmit(this.state.submittedValues);
    });
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
    const classes = classNames(rootClass, className, {
      [css.payoutModalOpen]: this.state.showPayoutDetails,
    });
    const currency = config.currencyConfig.currency;

    const payoutDetailsModal = (
      <Modal
        className={css.payoutModal}
        isOpen={this.state.showPayoutDetails}
        onClose={this.handlePayoutModalClose}
        togglePageClassNames={togglePageClassNames}
      >
        <PayoutDetailsForm
          className={css.payoutDetails}
          currency={currency}
          onSubmit={this.handlePayoutSubmit}
        />
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

EditListingPhotosPanelComponent.defaultProps = {
  className: null,
  rootClassName: null,
  images: [],
  currentUser: null,
};

EditListingPhotosPanelComponent.propTypes = {
  className: string,
  rootClassName: string,
  images: array,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  currentUser: propTypes.currentUser,
  togglePageClassNames: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onPayoutDetailsSubmit: values => dispatch(createStripeAccount(values)),
});

const EditListingPhotosPanel = connect(null, mapDispatchToProps)(EditListingPhotosPanelComponent);

export default EditListingPhotosPanel;
