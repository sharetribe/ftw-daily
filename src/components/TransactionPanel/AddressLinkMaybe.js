import React from 'react';
import classNames from 'classnames';
import { ExternalLink } from '../../components';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build AddressLinkMaybe
const AddressLinkMaybe = props => {
  const { className, rootClassName, location, geolocation, showAddress } = props;
  const { address, building } = location || {};
  const { lat, lng } = geolocation || {};
  const hrefToGoogleMaps = geolocation
    ? `https://maps.google.com/?q=${lat},${lng}`
    : address
    ? `https://maps.google.com/?q=${encodeURIComponent(address)}`
    : null;

  const fullAddress =
    typeof building === 'string' && building.length > 0 ? `${building}, ${address}` : address;

  const classes = classNames(rootClassName || css.address, className);
  return showAddress && hrefToGoogleMaps ? (
    <div><p><b>Location:</b></p>
    <p className={classes}>
      <ExternalLink href={hrefToGoogleMaps}>{fullAddress}</ExternalLink>
    </p>
    <p className={classes}>Click on the address to view it in Google Maps and plot a route to the Patch from wherever you are!</p></div>
  ) : null;
};

export default AddressLinkMaybe;
