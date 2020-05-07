import React, { Component } from 'react';
import { array, bool, func, number, object, oneOf, shape, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';
import { withViewport } from '../../util/contextHelpers';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../util/urlHelpers';
import { ensureListing, ensureCurrentUser } from '../../util/data';
import { PayoutDetailsForm } from '../../forms';
import { Modal, NamedRedirect, NamedLink, Tabs, SecondaryButton } from '../../components';

import EditListingWizardTab, {
  AVAILABILITY,
  DESCRIPTION,
  FEATURES,
  CAPACITY,
  POLICY,
  LOCATION,
  PRICING,
  PHOTOS,
  HOME,
} from './EditListingWizardTab';
import css from './EditListingWizard.css';

// Show availability calendar only if environment variable availabilityEnabled is true
const availabilityMaybe = config.enableAvailability ? [AVAILABILITY] : [AVAILABILITY];

// Tabs are horizontal in small screens
const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

const tabLabel = (intl, tab, user_name = null) => {
  let key = null;
  user_name = String(user_name);
  if (tab === DESCRIPTION) {
    key = 'EditListingWizard.tabLabelDescription' + '.' + user_name;
  } else if (tab === CAPACITY) {
    key = 'EditListingWizard.tabLabelCapacity' + '.' + user_name;
  } else if (tab === FEATURES) {
    key = 'EditListingWizard.tabLabelFeatures' + '.' + user_name;
  }else if (tab === POLICY) {
    key = 'EditListingWizard.tabLabelPolicy' + '.' + user_name;
  } else if (tab === LOCATION) {
    key = 'EditListingWizard.tabLabelLocation' + '.' + user_name;
  } else if (tab === PRICING) {
    key = 'EditListingWizard.tabLabelPricing' + '.' + user_name;
  } else if (tab === AVAILABILITY) {
    key = 'EditListingWizard.tabLabelAvailability' + '.' + user_name;
  } else if (tab === PHOTOS) {
    key = 'EditListingWizard.tabLabelPhotos' + '.' + user_name;
  } else if (tab === HOME) {
    key = 'EditListingWizard.tabLabelHome' + '.' + user_name;
  }
  return intl.formatMessage({ id: key });
};

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
    price,
    title,
    publicData,
  } = listing.attributes;
  const images = listing.images;
  switch (tab) {
    case DESCRIPTION:
      return !!(description && title && (publicData.user_type == 2 ? (publicData.service && publicData.service.length > 0) : true));
    case FEATURES:
      return !!(publicData && publicData.amenities);
    case HOME:
      return !!(publicData && publicData.locations && publicData.equipments);
    case CAPACITY:
      return !!(publicData && publicData.capacity);
    case POLICY:
      return !!(publicData && typeof publicData.rules !== 'undefined');
    case LOCATION:
      return !!(geolocation && publicData && publicData.location && publicData.location.address);
    case PRICING:
      return !!price;
    case AVAILABILITY:
      return !!availabilityPlan;
    case PHOTOS:
      return images && images.length > 0;
    default:
      return false;
  }
};

/**
 * Check which wizard tabs are active and which are not yet available. Tab is active if previous
 * tab is completed. In edit mode all tabs are active.
 *
 * @param isNew flag if a new listing is being created or an old one being edited
 * @param listing data to be checked
 *
 * @return object containing activity / editability of different tabs of this wizard
 */
const tabsActive = (isNew, listing, TABS) => {
  return TABS.reduce((acc, tab) => {
    const previousTabIndex = TABS.findIndex(t => t === tab) - 1;
    const isActive =
      previousTabIndex >= 0 ? !isNew || tabCompleted(TABS[previousTabIndex], listing) : true;
    return { ...acc, [tab]: isActive };
  }, {});
};

const scrollToTab = (tabPrefix, tabId) => {
  const el = document.querySelector(`#${tabPrefix}_${tabId}`);
  if (el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
};

// Create a new or edit listing through EditListingWizard
class EditListingWizard extends Component {
  constructor(props) {
    super(props);

    // Having this info in state would trigger unnecessary rerendering
    this.hasScrolledToTab = false;

    this.state = {
      draftId: null,
      showPayoutDetails: false,
    };
    this.handleCreateFlowTabScrolling = this.handleCreateFlowTabScrolling.bind(this);
    this.handlePublishListing = this.handlePublishListing.bind(this);
    this.handlePayoutModalClose = this.handlePayoutModalClose.bind(this);
    this.handlePayoutSubmit = this.handlePayoutSubmit.bind(this);
  }

  handleCreateFlowTabScrolling(shouldScroll) {
    this.hasScrolledToTab = shouldScroll;
  }

  handlePublishListing(id) {
    const { onPublishListingDraft, currentUser } = this.props;
    onPublishListingDraft(id);
    const stripeConnected =
      currentUser;
    



    if (stripeConnected) {
      onPublishListingDraft(id);
    } else {
      this.setState({
        draftId: id,
        showPayoutDetails: true,
      });
    }
  }


  // handlePublishListing(id) {
  //   const { onPublishListingDraft, currentUser } = this.props;
  //   onPublishListingDraft(id);
  //   const stripeConnected =
  //     currentUser && currentUser.stripeAccount && !!currentUser.stripeAccount.id;
    



  //   if (stripeConnected) {
  //     onPublishListingDraft(id);
  //   } else {
  //     this.setState({
  //       draftId: id,
  //       showPayoutDetails: true,
  //     });
  //   }
  // }
  handlePayoutModalClose() {
    this.setState({ showPayoutDetails: false });
  }

  handlePayoutSubmit(values) {
    this.props
      .onPayoutDetailsSubmit(values)
      .then(() => {
        this.setState({ showPayoutDetails: false });
        this.props.onManageDisableScrolling('EditListingWizard.payoutModal', false);
        this.props.onPublishListingDraft(this.state.draftId);
      })
      .catch(() => {
        // do nothing
      });
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
      onManageDisableScrolling,
      onPayoutDetailsFormChange,
      checkFlag,
      handleChange,

      ...rest
    } = this.props;
    const tab_ary = params.tab.split('_');

    const service = listing.attributes.publicData.service;
    var user_name;
    var user_type;
    if (tab_ary.length === 2) {
      if (tab_ary[1] === 'owner') {
        user_name = tab_ary[1];
        user_type = 0;
      } else if (tab_ary[1] === 'sitter') {
        user_name = tab_ary[1];
        user_type = 1;
      } else if (tab_ary[1] === 'service') {
        user_name = tab_ary[1];
        user_type = 2;
      }
    } else {
      user_type = listing.attributes.publicData.user_type;
      if (user_type === 0) {
        user_name = 'owner';
      } else if (user_type === 1) {
        user_name = 'sitter';
      } else if (user_type === 2) {
        user_name = 'service';
      }
    }

    // TODO: PHOTOS panel needs to be the last one since it currently contains PayoutDetailsForm modal
    // All the other panels can be reordered.

    const TABS =
      user_type === 0
        ? [DESCRIPTION, FEATURES, HOME, LOCATION, ...availabilityMaybe, PHOTOS]
        : user_type === 1
          ? [DESCRIPTION, FEATURES, HOME, LOCATION, ...availabilityMaybe, PRICING, PHOTOS]
          : service === 'walking' || service === 'sitter'
            ? [DESCRIPTION, FEATURES, LOCATION, PRICING, PHOTOS]
            : [DESCRIPTION, FEATURES, LOCATION, PRICING, PHOTOS];

    const selectedTab = tab_ary[0];
    const isNewListingFlow = [LISTING_PAGE_PARAM_TYPE_NEW, LISTING_PAGE_PARAM_TYPE_DRAFT].includes(
      params.type
    );
    const rootClasses = rootClassName || css.root;
    const classes = classNames(rootClasses, className);
    const currentListing = ensureListing(listing);
    const tabsStatus = tabsActive(isNewListingFlow, currentListing, TABS);

    // If selectedTab is not active, redirect to the beginning of wizard
    if (!tabsStatus[selectedTab]) {
      const currentTabIndex = TABS.indexOf(selectedTab);
      const nearestActiveTab = TABS.slice(0, currentTabIndex)
        .reverse()
        .find(t => tabsStatus[t]);

      return <NamedRedirect name="EditListingPage" params={{ ...params, tab: nearestActiveTab }} />;
    }

    const { width } = viewport;
    const hasViewport = width > 0;
    const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasVerticalTabLayout = hasViewport && width > MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasFontsLoaded =
      hasViewport && document.documentElement.classList.contains('fontsLoaded');

    // Check if scrollToTab call is needed (tab is not visible on mobile)
    if (hasVerticalTabLayout) {
      this.hasScrolledToTab = true;
    } else if (hasHorizontalTabLayout && !this.hasScrolledToTab && hasFontsLoaded) {
      const tabPrefix = id;
      scrollToTab(tabPrefix, selectedTab);
      this.hasScrolledToTab = true;
    }

    const tabLink = (tab, user_name) => {
      tab += '_' + user_name;
      return { name: 'EditListingPage', params: { ...params, tab } };
    };

    return (
      <div className={classes}>
        <div rootClassName={css.tabsContainer} className={css.buttonContainer}>
          <NamedLink
            className={css.backButtonContainer}
            name="OrderTypesPage"
            params={{ type: params.type }}
          >
            <SecondaryButton>Volver</SecondaryButton>
          </NamedLink>
        </div>

        <Tabs
          rootClassName={css.tabsContainer}
          navRootClassName={css.nav}
          tabRootClassName={css.tab}
        >
          {TABS.map(tab => {
            return (
              <EditListingWizardTab
                {...rest}
                key={tab}
                tabId={`${id}_${tab}`}
                tabLabel={tabLabel(intl, tab, user_name)}
                tabLinkProps={tabLink(tab, user_name)}
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
                user_type={user_type}
              />
            );
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
            <PayoutDetailsForm
              className={css.payoutDetails}
              inProgress={fetchInProgress}
              createStripeAccountError={errors ? errors.createStripeAccountError : null}
              currentUserId={ensureCurrentUser(this.props.currentUser).id}
              onChange={onPayoutDetailsFormChange}
              onSubmit={this.handlePayoutSubmit}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

EditListingWizard.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingWizard.propTypes = {
  id: string.isRequired,
  className: string,
  rootClassName: string,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    // tab: oneOf(TABS).isRequired,
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
  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onManageDisableScrolling: func.isRequired,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(withViewport, injectIntl)(EditListingWizard);
