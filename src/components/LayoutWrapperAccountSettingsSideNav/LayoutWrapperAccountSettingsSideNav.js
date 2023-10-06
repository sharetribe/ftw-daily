/**
 * This is a wrapper component for different Layouts.
 * Navigational 'aside' content should be added to this wrapper.
 */
import React, { useEffect } from 'react';
import { node, number, string, shape } from 'prop-types';
import { compose } from 'redux';

import { FormattedMessage } from '../../util/reactIntl';
import { withViewport } from '../../util/contextHelpers';
import { LayoutWrapperSideNav } from '../../components';

import { createGlobalState } from './hookGlobalState';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

// Add global state for tab scrolling effect
const initialScrollState = { scrollLeft: 0 };
const { useGlobalState } = createGlobalState(initialScrollState);

// Horizontal scroll animation using element.scrollTo()
const scrollToTab = (currentTab, scrollLeft, setScrollLeft) => {
  const el = document.querySelector(`#${currentTab}Tab`);

  if (el) {
    // el.scrollIntoView doesn't work with Safari and it considers vertical positioning too.
    // This scroll behaviour affects horizontal scrolling only
    // and it expects that the immediate parent element is scrollable.
    const parent = el.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const maxScrollDistance = parent.scrollWidth - parentRect.width;

    const hasParentScrolled = parent.scrollLeft > 0;
    const scrollPositionCurrent = hasParentScrolled ? parent.scrollLeft : scrollLeft;

    const tabRect = el.getBoundingClientRect();
    const diffLeftBetweenTabAndParent = tabRect.left - parentRect.left;
    const tabScrollPosition = parent.scrollLeft + diffLeftBetweenTabAndParent;

    const scrollPositionNew =
      tabScrollPosition > maxScrollDistance
        ? maxScrollDistance
        : parent.scrollLeft + diffLeftBetweenTabAndParent;

    const needsSmoothScroll = scrollPositionCurrent !== scrollPositionNew;

    if (!hasParentScrolled || (hasParentScrolled && needsSmoothScroll)) {
      // Ensure that smooth scroll animation uses old position as starting point after navigation.
      parent.scrollTo({ left: scrollPositionCurrent });
      // Scroll to new position
      parent.scrollTo({ left: scrollPositionNew, behavior: 'smooth' });
    }
    // Always keep track of new position (even if smooth scrolling is not applied)
    setScrollLeft(scrollPositionNew);
  }
};

const LayoutWrapperAccountSettingsSideNavComponent = props => {
  const { currentUserHasOneListings } = props;

  const [scrollLeft, setScrollLeft] = useGlobalState('scrollLeft');
  useEffect(() => {
    const { currentTab, viewport,currentUserHasOneListings } = props;

    const { width } = viewport;
    const hasViewport = width > 0;
    const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasFontsLoaded =
      hasViewport && document.documentElement.classList.contains('fontsLoaded');

    // Check if scrollToTab call is needed (tab is not visible on mobile)
    if (hasHorizontalTabLayout && hasFontsLoaded) {
      scrollToTab(currentTab, scrollLeft, setScrollLeft);
    }

    return () => {
      // Update scroll position when unmounting
      const el = document.querySelector(`#${currentTab}Tab`);
      setScrollLeft(el.parentElement.scrollLeft);
    };
  });

  const { currentTab } = props;

  const tabs = [
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.contactDetailsTabTitle" />,
      selected: currentTab === 'ContactDetailsPage',
      id: 'ContactDetailsPageTab',
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.passwordTabTitle" />,
      selected: currentTab === 'PasswordChangePage',
      id: 'PasswordChangePageTab',
      linkProps: {
        name: 'PasswordChangePage',
      },
    },
    
    // currentUserHasOneListings
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentsTabTitle" />,
      selected: currentTab === 'StripePayoutPage',
      id: 'StripePayoutPageTab',
      linkProps: {
        name: 'StripePayoutPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentMethodsTabTitle" />,
      selected: currentTab === 'PaymentMethodsPage',
      id: 'PaymentMethodsPageTab',
      linkProps: {
        name: 'PaymentMethodsPage',
      },
    },
  ];

  return <LayoutWrapperSideNav tabs={currentUserHasOneListings ? tabs : tabs.filter(item => item.id !== 'StripePayoutPageTab')}  />;
};

LayoutWrapperAccountSettingsSideNavComponent.defaultProps = {
  className: null,
  rootClassName: null,
  children: null,
  currentTab: null,
};

LayoutWrapperAccountSettingsSideNavComponent.propTypes = {
  children: node,
  className: string,
  rootClassName: string,
  currentTab: string,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,
};


const mapStateToProps = state => {
  const {
    currentUserHasOneListings,
  } = state.user;

  return {
    currentUserHasOneListings,
  };
};

// const UserNav = compose(
//   withRouter,
//   connect(
//     mapStateToProps,

//   )
// )(UserNavComponent);




const LayoutWrapperAccountSettingsSideNav = compose(withViewport ,
  
  withRouter,
  connect(
    mapStateToProps,

  ))(
  LayoutWrapperAccountSettingsSideNavComponent
);

export default LayoutWrapperAccountSettingsSideNav;
