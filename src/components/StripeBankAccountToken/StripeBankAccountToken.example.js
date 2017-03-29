import React, { Component } from 'react';
import StripeBankAccountToken from './StripeBankAccountToken';
import config from '../../config';

const invalidCountries = ['RU', 'CX', 'invalid'];
const countries = config.stripe.supportedCountries.concat(invalidCountries);

class TokenExample extends Component {
  constructor(props) {
    super(props);
    this.state = { country: countries[0] };
  }
  render() {
    const handleCountryChange = e => this.setState({ country: e.target.value });

    return (
      <div>
        <p>Select a country:</p>
        <select value={this.state.country} onChange={handleCountryChange}>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <StripeBankAccountToken country={this.state.country} />
      </div>
    );
  }
}

export const Empty = {
  component: TokenExample,
};
