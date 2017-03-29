/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import config from '../../config';

class StripeBankAccountToken extends Component {
  render() {
    const { country } = this.props;
    if (!config.stripe.supportedCountries.includes(country)) {
      return <p style={{ color: 'red' }}>{country} not supported!</p>;
    }
    return <p>bank account in {country}</p>;
  }
}

const { string } = PropTypes;

StripeBankAccountToken.propTypes = {
  country: string.isRequired,
};

export default StripeBankAccountToken;
