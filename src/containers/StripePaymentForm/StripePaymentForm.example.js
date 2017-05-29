import React, { Component } from 'react';
import { fakeIntl } from '../../util/test-data';
import StripePaymentForm from './StripePaymentForm';

class StripePaymentFormExample extends Component {
  constructor(props) {
    super(props);
    this.state = { token: null };
  }
  render() {
    const handleSubmit = token => {
      this.setState({ token });
    };
    return (
      <div>
        <StripePaymentForm {...this.props} onSubmit={handleSubmit} />
        {this.state.token ? <p>Token: {this.state.token}</p> : null}
      </div>
    );
  }
}

export const Empty = {
  component: StripePaymentFormExample,
  props: { intl: fakeIntl },
  group: 'forms',
};
