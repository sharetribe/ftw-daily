import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing, getSelectedCategories } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingDescriptionForm } from '../../forms';
import config from '../../config';

import css from './EditListingDescriptionPanel.module.css';

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
  const {
    description,
    title,
    publicData,
    // availabilityPlan
  } = currentListing.attributes;

  const isPublished = !!currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  );

  const categoryIds = config.custom.categories.map(cat => cat.id);
  // const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters);
  const categoryOptions = findOptionsForSelectFilter(categoryIds, config.custom.filters);
  const category = publicData.category ? publicData.category : [];
  const categoryOptionsToSelect = categoryOptions && categoryOptions.filter(item => category.includes(item.value))

  const oldCategoryArr = publicData && publicData.category && !!publicData.category[0].label

  
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDescriptionForm
        className={css.form}
        isPublished={isPublished}
        initialValues={{
          title,
          description,
          category: oldCategoryArr ? category : categoryOptionsToSelect,
          // availabilityPlan
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const {
            title,
            description,
            category,
            // availabilityPlan: { type }
          } = values;
          let updateValues = {
            title: title.trim(),
            description,
            publicData: {
              category: category && category.some(item => !!item) ? category.filter(value => !!value).map(i => i.value) : null,
            },
            // availabilityPlan: {
            //   type,
            //   entries: [],
            //   ...availabilityPlan
            // }
          }; 

          // if (type === 'availability-plan/time') {
          //   updateValues.publicData.unitType = 'line-item/units'
          //   updateValues.availabilityPlan.timezone = 'Etc/UTC';
          // }

          // if (type === 'availability-plan/day') {
          //   updateValues.publicData.unitType = 'line-item/day'
          //   updateValues.availabilityPlan.entries = [
          //     { dayOfWeek: 'mon', seats: 1 },
          //     { dayOfWeek: 'tue', seats: 1 },
          //     { dayOfWeek: 'wed', seats: 1 },
          //     { dayOfWeek: 'thu', seats: 1 },
          //     { dayOfWeek: 'fri', seats: 1 },
          //     { dayOfWeek: 'sat', seats: 1 },
          //     { dayOfWeek: 'sun', seats: 1 },
          //   ];
          // }

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={categoryOptions}
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
