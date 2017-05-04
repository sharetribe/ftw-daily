import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import { isEqual } from 'lodash';
import { arrayMove } from 'react-sortable-hoc';
import config from '../../config';
import * as propTypes from '../../util/propTypes';
import { enhancedField } from '../../util/forms';
import {
  noEmptyArray,
  maxLength,
  required,
  autocompleteSearchRequired,
  autocompletePlaceSelected,
} from '../../util/validators';
import {
  AddImages,
  CurrencyInput,
  LocationAutocompleteInput,
  Button,
  Input,
  StripeBankAccountToken,
} from '../../components';
import css from './EditListingForm.css';

const ACCEPT_IMAGES = 'image/*';
const TITLE_MAX_LENGTH = 60;

const { bool, func, object, shape, string } = PropTypes;

// Add image wrapper. Label is the only visible element, file input is hidden.
const RenderAddImage = props => {
  const { accept, input, label, type } = props;
  const { name, onChange } = input;
  const inputProps = { accept, id: name, name, onChange, type };
  return (
    <div className={css.addImageWrapper}>
      <Input {...inputProps} className={css.addImageInput} />
      <label htmlFor={name} className={css.addImage}>{label}</label>
    </div>
  );
};

RenderAddImage.propTypes = {
  accept: string.isRequired,
  input: shape({
    value: object,
    onChange: func.isRequired,
    name: string.isRequired,
  }).isRequired,
  label: string.isRequired,
  type: string.isRequired,
};

export class EditListingFormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleInitialize = this.handleInitialize.bind(this);
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);

    // We must create the enhanced components outside the render function
    // to avoid losing focus.
    // See: https://github.com/erikras/redux-form/releases/tag/v6.0.0-alpha.14
    this.EnhancedInput = enhancedField('input');
    this.EnhancedTextArea = enhancedField('textarea');
    this.EnhancedCurrencyInput = enhancedField(CurrencyInput);
    this.EnhancedLocationAutocompleteInput = enhancedField(LocationAutocompleteInput);
  }

  componentDidMount() {
    this.handleInitialize();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.images, nextProps.images)) {
      nextProps.change('images', nextProps.images);
    }
  }

  onImageUploadHandler(event) {
    const file = event.target.files[0];
    if (file) {
      this.props.onImageUpload({ id: `${file.name}_${Date.now()}`, file });
    }
  }

  onSortEnd({ oldIndex, newIndex }) {
    const images = arrayMove(this.props.images, oldIndex, newIndex);
    this.props.onUpdateImageOrder(images.map(i => i.id));
  }

  handleInitialize() {
    const { initData = {}, initialize } = this.props;
    initialize(initData);
  }

  render() {
    const {
      disabled,
      handleSubmit,
      images,
      intl,
      pristine,
      saveActionMsg = 'Save listing',
      submitting,
      selectedPlace,
      stripeConnected,
    } = this.props;
    const titleRequiredMessage = intl.formatMessage({ id: 'EditListingForm.titleRequired' });
    const maxLengthMessage = intl.formatMessage(
      { id: 'EditListingForm.maxLength' },
      {
        maxLength: TITLE_MAX_LENGTH,
      }
    );
    const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
    const priceRequiredMessage = intl.formatMessage({ id: 'EditListingForm.priceRequired' });
    const imageRequiredMessage = intl.formatMessage({ id: 'EditListingForm.imageRequired' });
    const locationRequiredMessage = intl.formatMessage({
      id: 'EditListingForm.locationRequired',
    });
    const locationNotRecognizedMessage = intl.formatMessage({
      id: 'EditListingForm.locationNotRecognized',
    });
    const bankAccountNumberRequiredMessage = intl.formatMessage({
      id: 'EditListingForm.bankAccountNumberRequired',
    });
    const descriptionRequiredMessage = intl.formatMessage({
      id: 'EditListingForm.descriptionRequired',
    });
    const pricePlaceholderMessage = intl.formatMessage({ id: 'EditListingForm.pricePlaceholder' });

    const country = selectedPlace ? selectedPlace.country : null;
    const showBankAccountField = !stripeConnected && country;
    const currency = config.currencyConfig.currency;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="title"
          label="Title"
          placeholder="Title"
          component={this.EnhancedInput}
          type="text"
          validate={[required(titleRequiredMessage), maxLength60Message]}
        />
        <Field
          name="price"
          label="Price"
          component={this.EnhancedCurrencyInput}
          currencyConfig={config.currencyConfig}
          validate={[required(priceRequiredMessage)]}
          placeholder={pricePlaceholderMessage}
        />

        <h3>Images</h3>
        <AddImages images={images} onSortEnd={this.onSortEnd}>
          <Field
            accept={ACCEPT_IMAGES}
            component={RenderAddImage}
            label="+ Add image"
            name="addImage"
            onChange={this.onImageUploadHandler}
            type="file"
          />

          <Field
            component={props => {
              const { input, type, meta: { error, touched } } = props;
              return (
                <div className={css.imageRequiredWrapper}>
                  <Input {...input} type={type} />
                  {touched && error
                    ? <span className={css.imageRequiredError}>{error}</span>
                    : null}
                </div>
              );
            }}
            name="images"
            type="hidden"
            validate={[noEmptyArray(imageRequiredMessage)]}
          />
        </AddImages>

        <Field
          name="location"
          label="Location"
          format={null}
          component={this.EnhancedLocationAutocompleteInput}
          validate={[
            autocompleteSearchRequired(locationRequiredMessage),
            autocompletePlaceSelected(locationNotRecognizedMessage),
          ]}
        />

        <Field
          name="description"
          label="Description"
          placeholder="Description"
          component={this.EnhancedTextArea}
          validate={[required(descriptionRequiredMessage)]}
        />

        {showBankAccountField
          ? <Field
              name="bankAccountToken"
              component={StripeBankAccountToken}
              props={{ country, currency }}
              validate={required(bankAccountNumberRequiredMessage)}
            />
          : null}

        <Button
          className={css.submitButton}
          type="submit"
          disabled={pristine || submitting || disabled}
        >
          {saveActionMsg}
        </Button>
      </form>
    );
  }
}

EditListingFormComponent.defaultProps = { initData: {}, selectedPlace: null };

EditListingFormComponent.propTypes = {
  ...formPropTypes,
  initData: shape({ title: string, description: string }),
  selectedPlace: propTypes.place,
  stripeConnected: bool.isRequired,
  intl: intlShape.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
};

const formName = 'EditListingForm';

// When a field depends on the value of another field, we must connect
// to the store and select the required values to inject to the
// component.
//
// See: http://redux-form.com/6.6.1/examples/selectingFormValues/
const selector = formValueSelector(formName);
const mapStateToProps = state => {
  const location = selector(state, 'location');
  return {
    selectedPlace: location && location.selectedPlace ? location.selectedPlace : null,
  };
};

export default compose(connect(mapStateToProps), reduxForm({ form: formName }), injectIntl)(
  EditListingFormComponent
);
