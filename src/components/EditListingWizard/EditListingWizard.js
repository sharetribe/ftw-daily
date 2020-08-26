import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import React, { Component } from 'react'
import {
  array, bool, func, number, object, oneOf, shape, string
} from 'prop-types'
import _ from 'lodash'
import { compose } from 'redux'
import classNames from 'classnames'
import { IconClock } from '../../assets/IconClock'
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl'
import config from '../../config'
import routeConfiguration from '../../routeConfiguration'
import { createResourceLocatorString } from '../../util/routes'
import { withViewport } from '../../util/contextHelpers'
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../util/urlHelpers'
import { ensureCurrentUser, ensureListing } from '../../util/data'

import {
  Modal, NamedRedirect, Tabs, StripeConnectAccountStatusBox
} from '..'
import { StripeConnectAccountForm } from '../../forms'
import MButton from '../MButton/MButton'
import { AlertDialog } from '../MModalDialog/MModalDialog'

import EditListingWizardTab, {
  DESCRIPTION,
  LOCATION,
  COLIVING,
  COWORKING,
  SURFING,
  PRODUCTS,
  AVAILABILITY,
  FEATURES,
  // POLICY,
  PHOTOS
} from './EditListingWizardTab'
import css from './EditListingWizard.css'

// Show availability calendar only if environment variable availabilityEnabled is true
const availabilityMaybe = config.enableAvailability ? [AVAILABILITY] : []

// You can reorder these panels.
// Note 1: You need to change save button translations for new listing flow
// Note 2: Ensure that draft listing is created after the first panel
// and listing publishing happens after last panel.
export const TABS = [
  DESCRIPTION,
  LOCATION,
  COLIVING,
  COWORKING,
  SURFING,
  PRODUCTS,
  AVAILABILITY,
  FEATURES,
  // POLICY,
  PHOTOS
]

// Tabs are horizontal in small screens
const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023

const tabLabel = (intl, tab) => {
  let key = null
  if (tab === DESCRIPTION) {
    key = 'EditListingWizard.tabLabelDescription'
  } else if (tab === FEATURES) {
    key = 'EditListingWizard.tabLabelFeatures'
  // } else if (tab === POLICY) {
  //   key = 'EditListingWizard.tabLabelPolicy';
  } else if (tab === LOCATION) {
    key = 'EditListingWizard.tabLabelLocation'
  } else if (tab === PRODUCTS) {
    key = 'EditListingWizard.tabLabelProducts'
  } else if (tab === AVAILABILITY) {
    key = 'EditListingWizard.tabLabelAvailability'
  } else if (tab === PHOTOS) {
    key = 'EditListingWizard.tabLabelPhotos'
  } else if (tab === COWORKING) {
    key = 'EditListingWizard.tabLabelCoworking'
  } else if (tab === COLIVING) {
    key = 'EditListingWizard.tabLabelColiving'
  } else if (tab === SURFING) {
    key = 'EditListingWizard.tabLabelSurfing'
  }

  return intl.formatMessage({ id: key })
}

/**
 * Check if a wizard tab is completed.
 *
 * @param tab wizard's tab
 * @param listing is contains some specific data if tab is completed
 *
 * @return true if tab / step is completed.
 */
const tabCompleted = (tab, listing) => {
  const {
    availabilityPlan,
    description,
    geolocation,
    // price,
    title,
    publicData,
  } = listing.attributes
  const { images } = listing

  switch (tab) {
    case DESCRIPTION:
      return !!(description && title)
    case FEATURES:
      return !!(publicData && publicData.amenities)
    // case POLICY:
    //   return !!(publicData && typeof publicData.rules !== 'undefined');
    case LOCATION:
      return !!(geolocation && publicData && publicData.location && publicData.location.address)
    // case PRICING:
    //   return !!price;
    case PRODUCTS:
      return publicData.products && publicData.products.length
    case AVAILABILITY:
      return !!availabilityPlan
    case COWORKING:
      return _.keys(_.get(publicData, 'coworking.images', {})).length > 0
    case COLIVING:
      return _.keys(_.get(publicData, 'coliving.images', {})).length > 0
    case SURFING:
      return _.keys(_.get(publicData, 'surfing.images', {})).length > 0
    case PHOTOS:
      return images && images.length > 0
    default:
      return false
  }
}

/**
 * Check which wizard tabs are active and which are not yet available. Tab is active if previous
 * tab is completed. In edit mode all tabs are active.
 *
 * @param isNew flag if a new listing is being created or an old one being edited
 * @param listing data to be checked
 *
 * @return object containing activity / editability of different tabs of this wizard
 */
const tabsActive = (isNew, listing) => {
  return TABS.reduce((acc, tab) => {
    const previousTabIndex = TABS.findIndex((t) => t === tab) - 1
    const isActive
      = previousTabIndex >= 0 ? !isNew || tabCompleted(TABS[previousTabIndex], listing) : true
    return { ...acc, [tab]: isActive }
  }, {})
}

const scrollToTab = (tabPrefix, tabId) => {
  const el = document.querySelector(`#${tabPrefix}_${tabId}`)
  if (el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }
}

// Create return URL for the Stripe onboarding form
const createReturnURL = (returnURLType, rootURL, routes, pathParams) => {
  const path = createResourceLocatorString(
    'EditListingStripeOnboardingPage',
    routes,
    { ...pathParams, returnURLType },
    {}
  )
  const root = rootURL.replace(/\/$/, '')
  return `${root}${path}`
}

// Get attribute: stripeAccountData
const getStripeAccountData = (stripeAccount) => stripeAccount.attributes.stripeAccountData || null

// Get last 4 digits of bank account returned in Stripe account
const getBankAccountLast4Digits = (stripeAccountData) => (stripeAccountData && stripeAccountData.external_accounts.data.length > 0
  ? stripeAccountData.external_accounts.data[0].last4
  : null)

// Check if there's requirements on selected type: 'past_due', 'currently_due' etc.
const hasRequirements = (stripeAccountData, requirementType) => stripeAccountData != null &&
  stripeAccountData.requirements &&
  Array.isArray(stripeAccountData.requirements[requirementType]) &&
  stripeAccountData.requirements[requirementType].length > 0

// Redirect user to Stripe's hosted Connect account onboarding form
const handleGetStripeConnectAccountLinkFn = (getLinkFn, commonParams) => (type) => () => {
  getLinkFn({ type, ...commonParams })
  .then((url) => {
    window.location.href = url
  })
  .catch((err) => console.error(err))
}

// Create a new or edit listing through EditListingWizard

class EditListingWizard extends Component {

  constructor(props) {
    super(props)

    // Having this info in state would trigger unnecessary rerendering
    this.hasScrolledToTab = false

    this.state = {
      draftId: null,
      showPayoutDetails: false,
      showWelcomeDialog: false,
    }
    this.handleCreateFlowTabScrolling = this.handleCreateFlowTabScrolling.bind(this)
    this.handlePublishListing = this.handlePublishListing.bind(this)
    this.handlePayoutModalClose = this.handlePayoutModalClose.bind(this)
    this.handlePayoutSubmit = this.handlePayoutSubmit.bind(this)
  }

  componentDidMount() {
    const { stripeOnboardingReturnURL } = this.props

    if (stripeOnboardingReturnURL != null) {
      this.setState({ showPayoutDetails: true })
    }

    setTimeout(() => {
      if (this.isNewListingFlow()) {
        this.setState({ showWelcomeDialog: true })
      }
    }, 2000)
  }

  handleCreateFlowTabScrolling(shouldScroll) {
    this.hasScrolledToTab = shouldScroll
  }

  handlePublishListing(id) {
    const { onPublishListingDraft, currentUser, stripeAccount } = this.props

    const stripeConnected
      = currentUser && currentUser.stripeAccount && !!currentUser.stripeAccount.id

    const stripeAccountData = stripeConnected ? getStripeAccountData(stripeAccount) : null

    const requirementsMissing
      = stripeAccount &&
      (hasRequirements(stripeAccountData, 'past_due') ||
        hasRequirements(stripeAccountData, 'currently_due'))

    if (stripeConnected && !requirementsMissing) {
      onPublishListingDraft(id)
    } else {
      this.setState({
        draftId: id,
        showPayoutDetails: true,
      })
    }
  }

  handlePayoutModalClose() {
    this.setState({ showPayoutDetails: false })
  }

  handlePayoutSubmit(values) {
    this.props
    .onPayoutDetailsSubmit(values)
    .then((response) => {
      this.props.onManageDisableScrolling('EditListingWizard.payoutModal', false)
    })
    .catch(() => {
      // do nothing
    })
  }

  isNewListingFlow = () => {
    return [LISTING_PAGE_PARAM_TYPE_NEW, LISTING_PAGE_PARAM_TYPE_DRAFT].includes(
      this.props.params.type
    )
  }

  welcomeDialog = () => {
    return (
      <div>
        <Dialog
          open={this.state.showWelcomeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ fontFamily: 'Nunito Sans' }}
          >
            Let's get you listed!
          </DialogTitle>
          <DialogContent>
            <Typography
              style={{ fontFamily: 'Nunito Sans', marginBottom: 20 }}
            >
              This first section will take around 5 minutes to complete. Once you complete this first section your listing will always be saved in case you want to come back another time to finish.
            </Typography>
            <Typography
              style={{ fontFamily: 'Nunito Sans', marginBottom: 20 }}
            >
              The whole listing will take about 25 minutes to complete.
            </Typography>
            <Grid container direction="column" spacing={2} justify={'center'} alignItems={'center'}>
              <Grid item xs={12}>
                <Typography>
                  Total Time To Complete
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <IconClock />
              </Grid>
            </Grid>
            <Typography
              style={{ fontFamily: 'Nunito Sans', marginTop: 20 }}
            >
              If you need help or something isn't quite working with your listing that would allow guests to effectively book with you, let us know by sending a message through the chat button in the bottom right.
            </Typography>
          </DialogContent>
          <DialogActions>
            <MButton
              onClick={() => this.setState({ showWelcomeDialog: false })}
              autoFocus
              endIcon={<ThumbUpOutlinedIcon />}
              label={'Got it'}
              color={'primary'}
            />
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  render() {
    const {
      id,
      className,
      rootClassName,
      params,
      listing,
      viewport,
      intl,
      errors,
      fetchInProgress,
      payoutDetailsSaveInProgress,
      payoutDetailsSaved,
      onManageDisableScrolling,
      onPayoutDetailsFormChange,
      onGetStripeConnectAccountLink,
      getAccountLinkInProgress,
      createStripeAccountError,
      updateStripeAccountError,
      fetchStripeAccountError,
      stripeAccountFetched,
      stripeAccount,
      currentUser,
      ...rest
    } = this.props
    const selectedTab = params.tab
    const isNewListingFlow = this.isNewListingFlow()
    const rootClasses = rootClassName || css.root
    const classes = classNames(rootClasses, className)
    const currentListing = ensureListing(listing)
    const tabsStatus = tabsActive(isNewListingFlow, currentListing)

    // If selectedTab is not active, redirect to the beginning of wizard
    if (!tabsStatus[selectedTab]) {
      const currentTabIndex = TABS.indexOf(selectedTab)
      const nearestActiveTab = TABS.slice(0, currentTabIndex)
      .reverse()
      .find((t) => tabsStatus[t])

      return <NamedRedirect name="EditListingPage" params={{ ...params, tab: nearestActiveTab }} />
    }

    const { width } = viewport
    const hasViewport = width > 0
    const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH
    const hasVerticalTabLayout = hasViewport && width > MAX_HORIZONTAL_NAV_SCREEN_WIDTH
    const hasFontsLoaded
      = hasViewport && document.documentElement.classList.contains('fontsLoaded')

    // Check if scrollToTab call is needed (tab is not visible on mobile)
    if (hasVerticalTabLayout) {
      this.hasScrolledToTab = true
    } else if (hasHorizontalTabLayout && !this.hasScrolledToTab && hasFontsLoaded) {
      const tabPrefix = id
      scrollToTab(tabPrefix, selectedTab)
      this.hasScrolledToTab = true
    }

    const tabLink = (tab) => {
      return { name: 'EditListingPage', params: { ...params, tab } }
    }

    const formDisabled = getAccountLinkInProgress
    const ensuredCurrentUser = ensureCurrentUser(currentUser)
    const currentUserLoaded = !!ensuredCurrentUser.id
    const stripeConnected = currentUserLoaded && !!stripeAccount && !!stripeAccount.id

    const rootURL = config.canonicalRootURL
    const routes = routeConfiguration()
    const { returnURLType, ...pathParams } = params
    const successURL = createReturnURL('success', rootURL, routes, pathParams)
    const failureURL = createReturnURL('failure', rootURL, routes, pathParams)

    const accountId = stripeConnected ? stripeAccount.id : null
    const stripeAccountData = stripeConnected ? getStripeAccountData(stripeAccount) : null

    const requirementsMissing
      = stripeAccount &&
      (hasRequirements(stripeAccountData, 'past_due') ||
        hasRequirements(stripeAccountData, 'currently_due'))

    const savedCountry = stripeAccountData ? stripeAccountData.country : null

    const handleGetStripeConnectAccountLink = handleGetStripeConnectAccountLinkFn(
      onGetStripeConnectAccountLink,
      {
        accountId,
        successURL,
        failureURL,
      }
    )

    const returnedNormallyFromStripe = returnURLType === 'success'
    const showVerificationError = returnURLType === 'failure'
    const showVerificationNeeded = stripeConnected && requirementsMissing

    // Redirect from success URL to basic path for StripePayoutPage
    if (returnedNormallyFromStripe && stripeConnected && !requirementsMissing) {
      return <NamedRedirect name="EditListingPage" params={pathParams} />
    }

    return (
      <div className={classes}>
        {this.welcomeDialog()}
        <Tabs
          rootClassName={css.tabsContainer}
          navRootClassName={css.nav}
          tabRootClassName={css.tab}
        >
          {TABS.map((tab) => {
            return (
              <EditListingWizardTab
                {...rest}
                key={tab}
                tabId={`${id}_${tab}`}
                tabLabel={tabLabel(intl, tab)}
                tabLinkProps={tabLink(tab)}
                selected={selectedTab === tab}
                disabled={isNewListingFlow && !tabsStatus[tab]}
                tab={tab}
                intl={intl}
                params={params}
                listing={listing}
                marketplaceTabs={TABS}
                errors={errors}
                handleCreateFlowTabScrolling={this.handleCreateFlowTabScrolling}
                handlePublishListing={this.handlePublishListing}
                fetchInProgress={fetchInProgress}
              />
            )
          })}
        </Tabs>
        <Modal
          id="EditListingWizard.payoutModal"
          isOpen={this.state.showPayoutDetails}
          onClose={this.handlePayoutModalClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.modalPayoutDetailsWrapper}>
            <h1 className={css.modalTitle}>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalTitleOneMoreThing" />
              <br />
              <FormattedMessage id="EditListingPhotosPanel.payoutModalTitlePayoutPreferences" />
            </h1>
            <p className={css.modalMessage}>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalInfo" />
            </p>
            {!currentUserLoaded ? (
              <FormattedMessage id="StripePayoutPage.loadingData" />
            ) : (
              <StripeConnectAccountForm
                disabled={formDisabled}
                inProgress={payoutDetailsSaveInProgress}
                ready={payoutDetailsSaved}
                stripeBankAccountLastDigits={getBankAccountLast4Digits(stripeAccountData)}
                savedCountry={savedCountry}
                submitButtonText={intl.formatMessage({
                  id: 'StripePayoutPage.submitButtonText',
                })}
                stripeAccountError={
                  createStripeAccountError || updateStripeAccountError || fetchStripeAccountError
                }
                stripeAccountFetched={stripeAccountFetched}
                onChange={onPayoutDetailsFormChange}
                onSubmit={rest.onPayoutDetailsSubmit}
                onGetStripeConnectAccountLink={handleGetStripeConnectAccountLink}
                stripeConnected={stripeConnected}
              >
                {stripeConnected && (showVerificationError || showVerificationNeeded) ? (
                  <StripeConnectAccountStatusBox
                    type={showVerificationError ? 'verificationError' : 'verificationNeeded'}
                    inProgress={getAccountLinkInProgress}
                    onGetStripeConnectAccountLink={handleGetStripeConnectAccountLink(
                      'custom_account_verification'
                    )}
                  />
                ) : stripeConnected && savedCountry ? (
                  <StripeConnectAccountStatusBox
                    type="verificationSuccess"
                    inProgress={getAccountLinkInProgress}
                    disabled={payoutDetailsSaveInProgress}
                    onGetStripeConnectAccountLink={handleGetStripeConnectAccountLink(
                      'custom_account_update'
                    )}
                  />
                ) : null}
              </StripeConnectAccountForm>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}

EditListingWizard.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
  updateInProgress: false,
}

EditListingWizard.propTypes = {
  id: string.isRequired,
  className: string,
  rootClassName: string,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(TABS).isRequired,
  }).isRequired,
  history: shape({
    push: func.isRequired,
    replace: func.isRequired,
  }).isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      publicData: object,
      description: string,
      geolocation: object,
      pricing: object,
      title: string,
    }),
    images: array,
  }),

  errors: shape({
    createListingDraftError: object,
    updateListingError: object,
    publishListingError: object,
    showListingsError: object,
    uploadImageError: object,
    createStripeAccountError: object,
  }).isRequired,
  fetchInProgress: bool.isRequired,
  payoutDetailsSaveInProgress: bool.isRequired,
  payoutDetailsSaved: bool.isRequired,
  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onGetStripeConnectAccountLink: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  updateInProgress: bool,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
}

export default compose(
  withViewport,
  injectIntl
)(EditListingWizard)
