import React, { useEffect, useRef, useState } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';

import css from './EditListingClassURLForm.module.css';

const TITLE_MAX_LENGTH = 60;

const EditListingClassURLFormComponent = props => {
  const { initialValues } = props;
  const [numberOfURL, setNumberofURL] = useState(1);
  const [urls, setURLS] = useState(initialValues);
  const urlInputContainerRef = useRef(null);

  useEffect(() => {
    let numberOfURLFromProps = 0;
    for (let url in initialValues){
      numberOfURLFromProps++;
    }

    if (numberOfURLFromProps === 0){
      numberOfURLFromProps++;
    }

    setNumberofURL(numberOfURLFromProps);
  },[])

  return (
    <FinalForm
      {...props}
      initialValues={urls}
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
          values,
        } = formRenderProps;

        const classURLMessage = intl.formatMessage({ id: 'EditListingClassURLForm.classURL' });
        const classURLPlaceholderMessage = intl.formatMessage({
          id: 'EditListingClassURLForm.classURLPlaceholder',
        });
        const classURLRequiredMessage = intl.formatMessage({
          id: 'EditListingClassURLForm.classURLRequired',
        });
        const maxLengthMessage = intl.formatMessage(
          { id: 'EditListingClassURLForm.maxLength' },
          {
            maxLength: TITLE_MAX_LENGTH,
          }
        );

        const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);

        const { updateListingError, showListingsError } = fetchErrors || {};
        const errorMessageUpdateListing = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingClassURLForm.updateFailed" />
          </p>
        ) : null;

        const errorMessageShowListing = showListingsError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingClassURLForm.showListingFailed" />
          </p>
        ) : null;

        const handleAddURLField = () => {
          setURLS({ ...values });
          setNumberofURL(numberOfURL + 1);
        }

        const renderURLFields = () => {
          const fieldList = [];
          for (let i = 0; i < numberOfURL; i++) {
            fieldList.push(
              <FieldTextInput
                id='url'
                name={"url" + i}
                className={css.subject}
                type="text"
                label={classURLMessage}
                placeholder={classURLPlaceholderMessage}
                maxLength={TITLE_MAX_LENGTH}
                validate={i === 0 ? composeValidators(required(classURLRequiredMessage), maxLength60Message) : null}
                autoFocus
              />
            )
          }
          return fieldList;
        }

        const classes = classNames(css.root, className);
        const submitReady = (updated && pristine) || ready;
        const submitInProgress = updateInProgress;
        const submitDisabled = invalid || disabled || submitInProgress;

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {errorMessageUpdateListing}
            {errorMessageShowListing}

            <div className={css.urlInputContainer} ref={urlInputContainerRef}>
              {renderURLFields()}
            </div>

            <div className={css.afterInputContainer}>
              <Button
                className={css.addUrlButton}
                type="button"
                onClick={handleAddURLField}
              >
                + URL
              </Button>
            </div>


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
}

EditListingClassURLFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingClassURLFormComponent.propTypes = {
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
};

export default compose(injectIntl)(EditListingClassURLFormComponent);
