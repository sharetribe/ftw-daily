import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';
import { ListingLink } from '../../components';
import { EditListingDescriptionForm } from '../../forms';
import config from '../../config';

import css from './EditListingDescriptionPanel.module.css';



const { Money } = sdkTypes;


const getInitialValues = params => {
  const { listing } = params;
  const { price } = listing?.attributes || {};

  return { price };
};


const EditListingDescriptionPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData, privateData } = currentListing.attributes;
  

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  );

  const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters);
  const brancheOptions = findOptionsForSelectFilter('branche', config.custom.filters);
  const landOptions = findOptionsForSelectFilter('land', config.custom.filters);

  
  const firmenwortlaut = privateData && privateData.firmenwortlaut;
  const plz = privateData && privateData.plz;
  const stadt = privateData && privateData.stadt;
  const strasse = privateData && privateData.strasse;
  const land = privateData && privateData.land;
  const laendervorwahl = privateData && privateData.laendervorwahl;
  const vorwahl = privateData && privateData.vorwahl;
  const telefonnummer = privateData && privateData.telefonnummer;
  const email = privateData && privateData.email;
  const firmenbuchnummer = privateData && privateData.firmenbuchnummer;
  const uidnummer = privateData && privateData.uidnummer;
  const websiteurl = privateData && privateData.websiteurl;
  const branche = privateData && privateData.branche;
  const kontaktanrede = privateData && privateData.kontaktanrede;
  const kontaktvorname = privateData && privateData.kontaktvorname;
  const kontaktnachname = privateData && privateData.kontaktnachname;
  const kontaktfunktion = privateData && privateData.kontaktfunktion;
  const kontakttelefon = privateData && privateData.kontakttelefon;
  const kontaktemail = privateData && privateData.kontaktemail;
  const nachricht = privateData && privateData.nachricht;


  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDescriptionForm
        className={css.form}
        initialValues={{ title, description, category: publicData.category, firmenwortlaut, plz, stadt, strasse, land, laendervorwahl, vorwahl, telefonnummer, email, firmenbuchnummer, uidnummer, websiteurl, branche, kontaktanrede, kontaktvorname, kontaktnachname, kontaktfunktion, kontakttelefon, kontaktemail, nachricht }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title, description, category, firmenwortlaut, price, plz, stadt, strasse, land, laendervorwahl, vorwahl, telefonnummer, email, firmenbuchnummer, uidnummer, websiteurl, branche, kontaktanrede, kontaktvorname, kontaktnachname, kontaktfunktion, kontakttelefon, kontaktemail, nachricht } = values;
          const updateValues = {
            title: title.trim(),
            price: new Money(0, "EUR"),
            description,
            publicData: { category },
            privateData: { firmenwortlaut, plz, stadt, strasse, land, laendervorwahl, vorwahl, telefonnummer, email, firmenbuchnummer, uidnummer, websiteurl, branche, kontaktanrede, kontaktvorname, kontaktnachname, kontaktfunktion, kontakttelefon, kontaktemail, nachricht },
            
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={categoryOptions}
        branches={brancheOptions}
        laender={landOptions}
        
        
        
      />
    </div>
  );
};

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingDescriptionPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingDescriptionPanel;
