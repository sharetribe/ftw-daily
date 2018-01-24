import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { withViewport } from '../../util/contextHelpers';
import { ensureListing } from '../../util/data';
import { NamedRedirect, Tabs } from '../../components';

import EditListingWizardTab, {
  DESCRIPTION,
  POLICY,
  LOCATION,
  PRICING,
  PHOTOS,
} from './EditListingWizardTab';
import css from './EditListingWizard.css';

// TODO: PHOTOS panel needs to be the last one since it currently contains PayoutDetailsForm modal
// All the other panels can be reordered.
export const TABS = [DESCRIPTION, POLICY, LOCATION, PRICING, PHOTOS];

// Tabs are horizontal in small screens
const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

const tabLabel = (intl, tab) => {
  let key = null;
  if (tab === DESCRIPTION) {
    key = 'EditListingWizard.tabLabelDescription';
  } else if (tab === POLICY) {
    key = 'EditListingWizard.tabLabelPolicy';
  } else if (tab === LOCATION) {
    key = 'EditListingWizard.tabLabelLocation';
  } else if (tab === PRICING) {
    key = 'EditListingWizard.tabLabelPricing';
  } else if (tab === PHOTOS) {
    key = 'EditListingWizard.tabLabelPhotos';
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
  const { description, geolocation, price, title, publicData } = listing.attributes;
  const images = listing.images;

  switch (tab) {
    case DESCRIPTION:
      return !!(description && title);
    case POLICY:
      return !!(publicData && typeof publicData.saunaRules !== 'undefined');
    case LOCATION:
      return !!(geolocation && publicData && publicData.location && publicData.location.address);
    case PRICING:
      return !!price;
    case PHOTOS:
      return images && images.length > 0;
    default:
      return false;
  }
};

/**
 * Check which wizard tabs are active and which are not yet available. Tab is active if previous
 * tab is completed.
 *
 * @param listing data to be checked
 *
 * @return object containing activity / editability of different tabs of this wizard
 */
const tabsActive = listing => {
  return TABS.reduce((acc, tab) => {
    const previousTabIndex = TABS.findIndex(t => t === tab) - 1;
    const isActive = previousTabIndex >= 0 ? tabCompleted(TABS[previousTabIndex], listing) : true;
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
  }

  render() {
    const { id, className, rootClassName, params, listing, viewport, intl, ...rest } = this.props;

    const selectedTab = params.tab;
    const rootClasses = rootClassName || css.root;
    const classes = classNames(rootClasses, className);
    const currentListing = ensureListing(listing);
    const tabsStatus = tabsActive(currentListing);

    // If selectedTab is not active, redirect to the beginning of wizard
    if (!tabsStatus[selectedTab]) {
      return <NamedRedirect name="EditListingPage" params={{ ...params, tab: TABS[0] }} />;
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

    const tabLink = tab => {
      return { name: 'EditListingPage', params: { ...params, tab } };
    };

    return (
      <Tabs rootClassName={classes} navRootClassName={css.nav} tabRootClassName={css.tab}>
        {TABS.map(tab => {
          return (
            <EditListingWizardTab
              {...rest}
              key={tab}
              tabId={`${id}_${tab}`}
              tabLabel={tabLabel(intl, tab)}
              tabLinkProps={tabLink(tab)}
              selected={selectedTab === tab}
              disabled={!tabsStatus[tab]}
              tab={tab}
              intl={intl}
              params={params}
              listing={listing}
              marketplaceTabs={TABS}
            />
          );
        })}
      </Tabs>
    );
  }
}

EditListingWizard.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

const { array, number, object, oneOf, shape, string } = PropTypes;

EditListingWizard.propTypes = {
  id: string.isRequired,
  className: string,
  rootClassName: string,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(['new', 'edit']).isRequired,
    tab: oneOf(TABS).isRequired,
  }).isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      customAttributes: object, // structure (key: value) can be defined in management console
      publicData: object,
      description: string,
      geolocation: object,
      pricing: object,
      title: string,
    }),
    images: array,
  }),

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(withViewport, injectIntl)(EditListingWizard);
