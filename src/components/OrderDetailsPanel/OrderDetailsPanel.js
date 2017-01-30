import React, { PropTypes } from 'react';
import { BookingInfo, NamedLink } from '../../components';

import css from './OrderDetailsPanel.css';

const ContactInfo = props => {
  const { addressLine1, addressLine2, phoneNumber } = props;
  return (
    <div>
      <p>{addressLine1}</p>
      <p>{addressLine2}</p>
      <p>{phoneNumber}</p>
      <p>Get directions</p>
    </div>
  );
};

const { number, oneOfType, string, object } = PropTypes;

ContactInfo.propTypes = {
  addressLine1: string.isRequired,
  addressLine2: string.isRequired,
  phoneNumber: string.isRequired,
};

const OrderDetailsPanel = props => {
  const { className, orderId, title, imageUrl, info, contact, confirmationCode } = props;
  return (
    <div className={className}>
      <img alt={title} src={imageUrl} style={{ width: '100%' }} />
      <h3>{title}</h3>
      <ContactInfo {...contact} />
      <p>Confirmation code {confirmationCode}</p>
      <BookingInfo {...info} />
      <p>Cancel booking</p>
      <NamedLink className={css.buttonLink} name="OrderDiscussionPage" params={{ id: orderId }}>
        You have a new message!
      </NamedLink>
    </div>
  );
};

OrderDetailsPanel.defaultProps = { className: null };

OrderDetailsPanel.propTypes = {
  className: string,
  orderId: oneOfType([string, number]).isRequired,
  title: string.isRequired,
  imageUrl: string.isRequired,
  info: object.isRequired,
  contact: object.isRequired,
  confirmationCode: string.isRequired,
};

export default OrderDetailsPanel;
