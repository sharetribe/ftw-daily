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
import dressImage from './images/dress_icon.jpg';

import css from './EditListingDescriptionForm.css';

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => {
  const { shopifyProducts, ...formProps } = props;

  function renderProducts(selectedProductId, onChange) {
    // TODO: implement form change when user clicks on photo
    if (shopifyProducts) {
      // append a other choice
      const productChoices = [
        ...shopifyProducts,
        { node: { id: 'Other', title: 'Other', featuredImage: { originalSrc: dressImage } } },
      ];
      return productChoices.map(product => {
        const productObj = product.node;
        const isSelected = productObj.id === selectedProductId;
        return (
          <div
            className={classNames(css.product, {
              [css.selectedProductImage]: isSelected,
            })}
          >
            <div className={css.threeToTwoWrapper}>
              <div className={css.aspectWrapper}>
                {/* TODO(SY): look through all possble image wrappers */}
                <img
                  className={css.productImage}
                  src={productObj.featuredImage.originalSrc}
                  onClick={() => onChange(productObj)}
                />
              </div>
            </div>
            <span>{productObj.title}</span>
          </div>
        );
      });
    }
    return null;
  }

  return (
    <FinalForm
      {...formProps}
      render={formRenderProps => {
        const {
          className,
          disabled,
          form,
          fetchErrors,
          ready,
          handleSubmit,
          intl,
          invalid,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          values,
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
        // gender and category need to be filled out before we can show products
        // TODO (SY): Currently only have women/dress products in our Shopify test development store. Next step is to add tags to all of the products, then we can just filter by gender and category tag.
        const requiredProductFieldsEntered =
          values.gender === 'women' && values.category === 'dress';
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
                  validate={composeValidators(required(categoryRequiredMessage))}
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
            {requiredProductFieldsEntered && (
              <>
                <label htmlFor="product">{productMessage}</label>
                <Field
                  id="shopifyProductId"
                  name="shopifyProductId"
                  // accept={ACCEPT_IMAGES}
                  form={null}
                  label={productMessage}
                  // type="file"
                  // disabled={imageUploadRequested}
                  validate={composeValidators(required(productRequiredMessage))}
                  required

                >
                  {fieldProps => {
                    const { input } = fieldProps;
                    const onChange = product => {
                      form.change('title', product.title);
                      input.onChange(product.id);
                    };
                    return (
                      <div className={css.productImagesContainer}>
                        {renderProducts(input.value, onChange)}
                      </div>
                    );
                  }}
                </Field>
              </>
            )}
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
