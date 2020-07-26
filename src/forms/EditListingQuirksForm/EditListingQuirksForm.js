import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { Form, Button, FieldTextInput } from '../../components';

import css from './EditListingQuirksForm.css';

export const EditListingQuirksFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const quirksLabelMessage = intl.formatMessage({
        id: 'EditListingQuirksForm.quirksLabel',
      });
      const quirksPlaceholderMessage = intl.formatMessage({
        id: 'EditListingQuirksForm.quirksPlaceholder',
      });

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingQuirksForm.updateFailed" />
        </p>
      ) : null;
      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingQuirksForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <FieldTextInput
            id="quirks"
            name="quirks"
            className={css.quirks}
            type="textarea"
            label={quirksLabelMessage}
            placeholder={quirksPlaceholderMessage}
          />
          <span className={css.quirksDescription}>
            A “quirk” is a small defect that the Buyer may notice upon receiving your item. It could
            be a button that’s missing, a small stain, or perhaps a tear in the fabric. You’ll have
            the opportunity to take photos of each quirk so there won’t be any surprises for your
            Buyer.
          </span>
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

EditListingQuirksFormComponent.defaultProps = {
  updateError: null,
};

EditListingQuirksFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateError: propTypes.error,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingQuirksFormComponent);
