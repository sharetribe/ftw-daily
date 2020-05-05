import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';

import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, CategoryField, FieldCheckboxGroup } from '../../components';
// import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';

import css from './EditListingDescriptionForm.css';

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {

        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        user_type,
        service,
      } = fieldRenderProps;


      const user_name = user_type === 0 ? "owner" : user_type === 1 ? "sitter" : "service";
      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title.' + user_name });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder.' + user_name,
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.description.' + user_name,
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder.' + user_name,
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionRequired',
      });

      const categoryServiceLabel = intl.formatMessage({
        id: 'EditListingDescriptionForm.category.service.label',
        // values: {animal},
      });
      const categoryServicePlaceholder = intl.formatMessage({
        id: 'EditListingDescriptionForm.category.service.placeholder',
        // values: {animal},
      });
      const categoryServiceRequired = required(
        intl.formatMessage({
          id: 'EditListingDescriptionForm.category.service.required',
          // values: {animal},
        })
      );

      const sitterTypeRequired = required(
        intl.formatMessage({
          id: 'EditListingDescriptionForm.category.sittertype.required',
        })
      );

      const videoRequiredMessage = required('Por favor agrega video');

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}

          {/* {
            user_type ==2?
            (
              <FieldTextInput
                id="business"
                name="business"
                className={css.title}
                type="text"
                label={titleMessage}
                placeholder={titlePlaceholderMessage}
              />
              
            ):null
          } */}
          {
            user_type === 2 ?
              (
                <>
                  <div>
                    <h3>Por favor selecciona tus opciones</h3>
                    <FieldCheckboxGroup
                      className={css.features}
                      id="service"
                      name="service"
                      options={service}
                    />
                  </div>

                  {
                    fieldRenderProps.values.service && fieldRenderProps.values.service.includes("food") ?
                      <div>
                        <h3>Please choose Food Type</h3>
                        <FieldCheckboxGroup
                          className={css.features}
                          id="foodtype"
                          name="foodtype"
                          options={[
                            { key: "treats", label: "Treats" },
                            { key: "raw", label: "Raw" },
                            { key: "fresh", label: "Fresh" },
                            { key: "vegan", label: "Vegan" }
                          ]}
                        />
                      </div> : null

                  }


                </>


              ) : null




          }

          {
            user_type === 1 ?
              (
                <div>
                  <CategoryField
                    className={css.title}
                    id="sittertype"
                    name="sittertype"
                    categories={[{ key: 'overnight', label: "Overnight" }, { key: "daycare", label: "Daycare" }]}
                    categoryLabel="Select Type"
                    categoryPlaceholder="Pet Sitter Type"
                    categoryRequired={sitterTypeRequired}
                  >
                  </CategoryField>
                </div>
              ) : null
          }




          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />

          <FieldTextInput
            id="user_type"
            name="user_type"
            className={css.hiden}
            type="text"
          />

          <FieldTextInput
            id="video"
            name="video"
            className={css.title}
            type="text"
            label="tu video"
            placeholder="Agrega tu url"
            message="esto esa siendo llamado del archivo de fotos"
            validate={composeValidators(required(videoRequiredMessage))}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingDescriptionFormComponent.defaultProps = {
  className: null,
  fetchErrors: null
};

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
