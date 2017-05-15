import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { EditListingLocationForm } from '../../containers';

import css from './EditListingLocationPanel.css';

const EditListingLocationPanel = props => {
  const { className, rootClassName, listing, onSubmit } = props;

  const rootClass = rootClassName || css.root;
  const classes = classNames(rootClass, className);
  const { attributes: { address, geolocation } } = listing || { attributes: {} };

  // Only render current search if full place object is available in the URL params
  // TODO bounds and country are missing - those need to be queried directly from Google Places
  const locationFieldsPresent = address && geolocation;

  // TODO location address is currently serialized inside address field (API will change later)
  // Content is something like { locationAddress: 'Street, Province, Country', building: 'A 42' };
  let locationAddress = "";
  let building = "";
  try {
    const deserializedAddress = JSON.parse(address || "{}");
    locationAddress = deserializedAddress.locationAddress;
    building = deserializedAddress.building;
  } catch(e) {
    locationAddress = address;
  }

  const initialSearchFormValues = {
    building,
    location: locationFieldsPresent
      ? {
          search: locationAddress,
          selectedPlace: { address: locationAddress, origin: geolocation },
        }
      : null,
  };

  return (
    <div className={classes}>
      <h1><FormattedMessage id="EditListingLocationPanel.title" /></h1>
      <EditListingLocationForm initialValues={initialSearchFormValues} onSubmit={onSubmit} />
    </div>
  );
};

const { func, object, string } = PropTypes;

EditListingLocationPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingLocationPanel.propTypes = {
  className: string,
  rootClassName: string,
  listing: object, // TODO Should be propTypes.listing after API support is added.
  onSubmit: func.isRequired,
};

export default EditListingLocationPanel;
