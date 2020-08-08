import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import {
  arrayOf, bool, func, shape, string
} from 'prop-types'
import _ from 'lodash'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import classNames from 'classnames'
import ListingEditWowHero from '../../components/ListingEditWowHero/ListingEditWowHero'
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl'
import { propTypes } from '../../util/types'
import {
  maxLength, required, isValidNumber, validYouTubeURL, composeValidators
} from '../../util/validators'
import {
  Form, Button, FieldTextInput, FieldBoolean
} from '../../components'
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe'

import css from './EditListingDescriptionForm.css'

const TITLE_MAX_LENGTH = 60

const EditListingDescriptionFormComponent = (props) => (
  <FinalForm
    {...props}
    render={(formRenderProps) => {
      const {
        categories,
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
        form,
      } = formRenderProps

      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' })
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      })
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      })
      const heroMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.hero',
      })
      const heroMessagePlaceholder = intl.formatMessage({
        id: 'EditListingDescriptionForm.heroPlaceholder',
      })
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      )
      const vibeMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.vibe',
      })
      const vibePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.vibePlaceholder',
      })
      const communityMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.community',
      })
      const communityPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.communityPlaceholder',
      })
      const retreatMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreat',
      })
      const retreatCapacityMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatCapacity',
      })
      const retreatCapacityPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatCapacityPlaceholder',
      })
      const retreatCapacityValidMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatCapacityInvalid',
      })
      const retreatDescriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatDescription',
      })
      const retreatDescriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatDescriptionPlaceholder',
      })
      const videoMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.video',
      })
      const videoPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.videoPlaceholder',
      })
      const videoValidMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.videoInvalid',
      })
      const welcomeMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.welcomeMessage',
      })
      const welcomeMessagePlaceholder = intl.formatMessage({
        id: 'EditListingDescriptionForm.welcomeMessage',
      })
      const welcomeMessageSigner = intl.formatMessage({
        id: 'EditListingDescriptionForm.welcomeMessageSigner',
      })
      const welcomeMessageSignerPlaceholder = intl.formatMessage({
        id: 'EditListingDescriptionForm.welcomeMessageSignerPlaceholder',
      })
      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.description',
      })
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder',
      })
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH)
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionRequired',
      })

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {}
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null

      const showRetreatForm = values.retreat && values.retreat.accepted

      const retreatShowFields = showRetreatForm ? (
        <>
          <FieldTextInput
            id="retreat.capacity"
            name="retreat.capacity"
            className={css.description}
            type="text"
            label={retreatCapacityMessage}
            placeholder={retreatCapacityPlaceholderMessage}
            validate={composeValidators(isValidNumber(retreatCapacityValidMessage))}
          />

          <FieldTextInput
            id="retreat.description"
            name="retreat.description"
            className={css.description}
            type="textarea"
            label={retreatDescriptionMessage}
            placeholder={retreatDescriptionPlaceholderMessage}
          />
        </>
      ) : null

      const classes = classNames(css.root, className)
      const submitReady = (updated && pristine) || ready
      const submitInProgress = updateInProgress
      const submitDisabled = invalid || disabled || submitInProgress

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <Paper className={css.paperSection}>
            <Grid container className={classes.root} direction="column" spacing={5}>
              <Grid item xs={12}>
                <h3 className={css.sectionTitle}>The Big Hello</h3>
                <p className={css.sectionSubtitle}>This image and text will be the first thing travelers will see</p>
              </Grid>
              <Grid item xs={12}>
                <ListingEditWowHero
                  listing={_.get(props, 'listing', {})}
                  form={form}
                  values={values}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <FieldTextInput
                  id="heroSubtitle"
                  name="heroSubtitle"
                  className={css.description}
                  type="textarea"
                  label={heroMessage}
                  placeholder={heroMessagePlaceholder}
                  validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomCategorySelectFieldMaybe
                  id="category"
                  name="category"
                  categories={categories}
                  intl={intl}
                  validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper className={css.paperSection}>
            <Grid container className={classes.root} direction="column" spacing={5}>
              <Grid item xs={12}>
                <h3 className={css.sectionTitle}>Welcome</h3>
                <p className={css.sectionSubtitle}>This welcome message will appear at the very top of your listing</p>
              </Grid>
              <Grid item xs={12}>
                <div className={css.quoteContainer}>
                  <h3 className={css.welcomeMessage}>{`"${values.welcomeMessage || 'We think something special happens when we combine community, work, surf, radical mountains and northern lights.'}"`}</h3>
                  <p className={css.welcomeMessageSigner}>{`-${values.welcomeMessageSigner || 'Rolf & Stian - Founders of the Arctic Coworking Lodge'}`}</p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <FieldTextInput
                  id="welcomeMessage"
                  name="welcomeMessage"
                  className={css.video}
                  type="text"
                  label={welcomeMessage}
                  placeholder={welcomeMessagePlaceholder}
                />
              </Grid>
              <Grid item xs={12}>
                <FieldTextInput
                  id="welcomeMessageSigner"
                  name="welcomeMessageSigner"
                  className={css.video}
                  type="text"
                  label={welcomeMessageSigner}
                  placeholder={welcomeMessageSignerPlaceholder}
                />
              </Grid>
              <Grid item xs={12}>
                <FieldTextInput
                  id="description"
                  name="description"
                  className={css.community}
                  type="textarea"
                  label={descriptionMessage}
                  placeholder={descriptionPlaceholderMessage}
                  validate={composeValidators(required(descriptionRequiredMessage))}
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper className={css.paperSection}>
            <Grid container className={classes.root} direction="column" spacing={5}>
              <Grid item xs={12}>
                <h3 className={css.sectionTitle}>Everything Else</h3>
                <p className={css.sectionSubtitle}>Equally important, just harder to categorize</p>
              </Grid>
              <Grid item xs={12}>
                <FieldTextInput
                  id="video"
                  name="video"
                  className={css.video}
                  type="text"
                  label={videoMessage}
                  placeholder={videoPlaceholderMessage}
                  validate={composeValidators(validYouTubeURL(videoValidMessage))}
                />
              </Grid>
              <Grid item xs={12}>
                <FieldBoolean
                  id="retreat.accepted"
                  name="retreat.accepted"
                  className={css.retreat}
                  label={retreatMessage}
                  placeholder="Choose yes/no"
                  validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
                />
              </Grid>
              <Grid item xs={12}>
                {retreatShowFields}
              </Grid>
            </Grid>
          </Paper>
          <Button
            className={css.submitButton}
            onClick={() => props.onSubmit(values, 'redirect')}
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      )
    }}
  />
)

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null }

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
}

export default compose(injectIntl)(EditListingDescriptionFormComponent)
