import React from 'react';
import { array, arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Field, Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldRadioButton } from '../../components';
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';

import css from './EditListingDescriptionForm.css';

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => {
  const { shopifyProducts, ...formProps } = props;

  function renderImages(onChange) {
    // TODO: implement form change when user clicks on photo
    if (shopifyProducts) {
      return shopifyProducts.map(product => (
        <div className={css.threeToTwoWrapper}>
          <div className={css.aspectWrapper}>
            {/* TODO(SY): look through all possble image wrappers */}
            <img className={css.productImage} src={product.node.featuredImage.originalSrc} />
          </div>
        </div>
      ));
    }
  }

  return (
    <FinalForm
      {...formProps}
      render={formRenderProps => {
        const {
          categories,
          className,
          disabled,
          fetchErrors,
          ready,
          handleSubmit,
          intl,
          invalid,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
        } = formRenderProps;

        const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
        const titlePlaceholderMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.titlePlaceholder',
        });
        const titleRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.titleRequired',
        });

        const genderMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.gender' });

        const genderRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.genderRequired',
        });

        const categoryMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.category' });

        const categoryRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.categoryRequired',
        });

        const productMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.product' });

        const productRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.productRequired',
        });

        const maxLengthMessage = intl.formatMessage(
          { id: 'EditListingDescriptionForm.maxLength' },
          {
            maxLength: TITLE_MAX_LENGTH,
          }
        );

        const descriptionMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.description',
        });
        const descriptionPlaceholderMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.descriptionPlaceholder',
        });
        const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
        const descriptionRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.descriptionRequired',
        });

        const { updateListingError, createListingDraftError, showListingsError } =
          fetchErrors || {};
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
        const submitReady = (updated && pristine) || ready;
        const submitInProgress = updateInProgress;
        const submitDisabled = invalid || disabled || submitInProgress;

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {errorMessageCreateListingDraft}
            {errorMessageUpdateListing}
            {errorMessageShowListing}
            {/* <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          /> */}
            {/* TODO (SY): refactor radio buttons into its own cloass */}
            <div className={css.radioGroup}>
              <label htmlFor={'gender'}>{genderMessage}</label>
              <div className={css.radioOptions}>
                <FieldRadioButton
                  id="gender-option-womens"
                  name="gender"
                  label="Women's"
                  value="women"
                  className={css.radioOption}
                  showAsRequired
                />
                <FieldRadioButton
                  id="gender-option-mens"
                  name="gender"
                  label="Men's"
                  value="mens"
                  className={css.radioOption}
                  showAsRequired
                />
                <FieldRadioButton
                  id="gender-option-unisex"
                  name="gender"
                  label="Unisex"
                  value="unisex"
                  className={css.radioOption}
                  showAsRequired
                />
              </div>
            </div>
            <div className={css.radioGroup}>
              <label htmlFor="category">{categoryMessage}</label>
              <div className={css.radioOptions}>
                <FieldRadioButton
                  id="category-option-top"
                  name="category"
                  label="Top"
                  value="top"
                  className={css.radioOption}
                  showAsRequired
                />
                <FieldRadioButton
                  id="category-option-bottom"
                  name="category"
                  label="Bottom"
                  value="bottoms"
                  className={css.radioOption}
                  showAsRequired
                />
                <FieldRadioButton
                  id="category-option-dress"
                  name="category"
                  label="Dress/Jumpsuit"
                  value="dress"
                  className={css.radioOption}
                  showAsRequired
                />
                <FieldRadioButton
                  id="category-option-accessory"
                  name="category"
                  label="Accessory"
                  value="accessory"
                  className={css.radioOption}
                  showAsRequired
                />
              </div>
            </div>
            {/* <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />

          <CustomCategorySelectFieldMaybe
            id="category"
            name="category"
            categories={categories}
            intl={intl}
          /> */}
            <Field
              id="productId"
              name="productId"
              // accept={ACCEPT_IMAGES}
              form={null}
              label={productMessage}
              // type="file"
              // disabled={imageUploadRequested}
            >
              {fieldprops => {
                // const { accept, input, label, disabled: fieldDisabled } = fieldprops;
                // const { name, type } = input;
                const onChange = e => {
                  // const file = e.target.files[0];
                  // form.change(`addImage`, file);
                  // form.blur(`addImage`);
                  // onImageUploadHandler(file);
                  console.log(e);
                };
                // const inputProps = { accept, id: name, name, onChange, type };
                // return (
                //   <div className={css.addImageWrapper}>
                //     <div className={css.aspectRatioWrapper}>
                //       {fieldDisabled ? null : (
                //         <input {...inputProps} className={css.addImageInput} />
                //       )}
                //       <label htmlFor={name} className={css.addImage}>
                //         {label}
                //       </label>
                //     </div>
                //   </div>
                // );
                return <div className={css.productImagesContainer}>{renderImages(onChange)}</div>;
              }}
            </Field>
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
};

EditListingDescriptionFormComponent.defaultProps = {
  className: null,
  fetchErrors: null,
  shopifyProducts: [],
};

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
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
  shopifyProducts: array,
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
