import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { isTransactionsTransitionAlreadyReviewed } from '../../util/errors';
import * as propTypes from '../../util/propTypes';
import { required } from '../../util/validators';
import { FieldReviewRating, Form, PrimaryButton, TextInputField } from '../../components';

import css from './ReviewForm.css';

const ReviewFormComponent = props => {
  const {
    className,
    rootClassName,
    disabled,
    handleSubmit,
    intl,
    form,
    invalid,
    submitting,
    reviewSent,
    sendReviewError,
    sendReviewInProgress,
  } = props;

  const reviewRating = intl.formatMessage({ id: 'ReviewForm.reviewRatingLabel' });
  const reviewRatingRequiredMessage = intl.formatMessage({
    id: 'ReviewForm.reviewRatingRequired',
  });

  const reviewContent = intl.formatMessage({ id: 'ReviewForm.reviewContentLabel' });
  const reviewContentPlaceholderMessage = intl.formatMessage({
    id: 'ReviewForm.reviewContentPlaceholder',
  });
  const reviewContentRequiredMessage = intl.formatMessage({
    id: 'ReviewForm.reviewContentRequired',
  });

  const errorMessage = isTransactionsTransitionAlreadyReviewed(sendReviewError) ? (
    <p className={css.error}>
      <FormattedMessage id="ReviewForm.reviewSubmitAlreadySent" />
    </p>
  ) : (
    <p className={css.error}>
      <FormattedMessage id="ReviewForm.reviewSubmitFailed" />
    </p>
  );
  const errorArea = sendReviewError ? errorMessage : <p className={css.errorPlaceholder} />;

  const reviewSubmitMessage = intl.formatMessage({
    id: 'ReviewForm.reviewSubmit',
  });

  const classes = classNames(rootClassName || css.root, className);
  const submitInProgress = submitting || sendReviewInProgress;
  const submitDisabled = invalid || disabled || submitInProgress;

  return (
    <Form className={classes} onSubmit={handleSubmit}>
      <FieldReviewRating
        className={css.reviewRating}
        id={`${form}.starRating`}
        name="reviewRating"
        label={reviewRating}
        validate={required(reviewRatingRequiredMessage)}
      />

      <TextInputField
        className={css.reviewContent}
        type="textarea"
        name="reviewContent"
        id={`${form}.reviewContent`}
        label={reviewContent}
        placeholder={reviewContentPlaceholderMessage}
        validate={[required(reviewContentRequiredMessage)]}
      />

      {errorArea}
      <PrimaryButton
        className={css.submitButton}
        type="submit"
        inProgress={submitInProgress}
        disabled={submitDisabled}
        ready={reviewSent}
      >
        {reviewSubmitMessage}
      </PrimaryButton>
    </Form>
  );
};

ReviewFormComponent.defaultProps = { className: null, rootClassName: null, sendReviewError: null };

const { bool, func, string } = PropTypes;

ReviewFormComponent.propTypes = {
  ...formPropTypes,
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  reviewSent: bool.isRequired,
  sendReviewError: propTypes.error,
  sendReviewInProgress: bool.isRequired,
};

const formName = 'ReviewForm';

export default compose(reduxForm({ form: formName }), injectIntl)(ReviewFormComponent);
