import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureListing } from '../../util/data';
import { createSlug } from '../../util/urlHelpers';
import { NamedLink } from '../../components';
import { EditListingPoliciesForm } from '../../containers';

import css from './EditListingPoliciesPanel.css';

const EditListingPoliciesPanel = props => {
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
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { title, publicData } = currentListing.attributes;
  const listingTitle = title || '';
  const listingLink = currentListing.id ? (
    <NamedLink name="ListingPage" params={{ id: currentListing.id.uuid, slug: createSlug(title) }}>
      {listingTitle}
    </NamedLink>
  ) : (
    ''
  );

  const panelTitle = currentListing.id ? (
    <FormattedMessage id="EditListingPoliciesPanel.title" values={{ listingTitle: listingLink }} />
  ) : (
    <FormattedMessage id="EditListingPoliciesPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingPoliciesForm
        className={css.form}
        publicData={publicData}
        onSubmit={onSubmit}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPoliciesPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPoliciesPanel.propTypes = {
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

export default EditListingPoliciesPanel;
