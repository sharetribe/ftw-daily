import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingLocationForm } from '../../forms';
import config from '../../config';
import css from './EditListingLocationPanel.css';
import { types as sdkTypes } from '../../util/sdkLoader';
const { Money } = sdkTypes;


class EditListingLocationPanel extends Component {
  constructor(props) {
    super(props);

    this.getInitialValues = this.getInitialValues.bind(this);

    this.state = {
      initialValues: this.getInitialValues(),
    };
  }

  getInitialValues() {
    const { listing } = this.props;
    const currentListing = ensureOwnListing(listing);
    const { geolocation, publicData } = currentListing.attributes;

    // Only render current search if full place object is available in the URL params
    // TODO bounds are missing - those need to be queried directly from Google Places
    const locationFieldsPresent =
      publicData && publicData.location && publicData.location.address && geolocation;
    const location = publicData && publicData.location ? publicData.location : {};
    const { address, building } = location;

    return {
      building,
      location: locationFieldsPresent
        ? {
            search: address,
            selectedPlace: { address, origin: geolocation },
          }
        : null,
    };
  }

  render() {
    const {
      className,
      rootClassName,
      listing,
      onSubmit,
      onChange,
      submitButtonText,
      panelUpdated,
      updateInProgress,
      errors,
      user_type
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    const currentListing = ensureOwnListing(listing);
  
    const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
    const user_name = user_type === 0?"owner":user_type === 1?"sitter":"service";
    const publish = isPublished ?"title.":"createListingTitle.";
    const LocationPanelTitle = 'EditListingLocationPanel.' + publish + user_name;
      
    const panelTitle = isPublished ? (
      <FormattedMessage
        id={LocationPanelTitle}
        values={{ listingTitle: <ListingLink listing={listing} /> }}
      />
    ) : (
      <FormattedMessage id={LocationPanelTitle} />
    );

    const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);

    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle}</h1>
        <EditListingLocationForm
          className={css.form}
          initialValues={this.state.initialValues}
          onSubmit={values => {
            const { building = '', location, price = minPrice } = values;
            const {
              selectedPlace: { address, origin },
            } = location;
            const updateValues = {
              geolocation: origin,
              publicData: {
                location: { address, building },
              },
              price: price
            };
            this.setState({
              initialValues: {
                building,
                location: { search: address, selectedPlace: { address, origin } },
                price: minPrice
              },
            });
            onSubmit(updateValues);
          }}
          onChange={onChange}
          saveActionMsg={submitButtonText}
          updated={panelUpdated}
          updateInProgress={updateInProgress}
          fetchErrors={errors}
          listing={ listing }
          user_type ={ user_type}
        />
      </div>
    );
  }
}

const { func, object, string, bool } = PropTypes;

EditListingLocationPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingLocationPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingLocationPanel;
