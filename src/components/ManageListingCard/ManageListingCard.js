import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import routeConfiguration from '../../routeConfiguration';
import { LISTING_STATE_PENDING_APPROVAL, LISTING_STATE_CLOSED, propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureOwnListing } from '../../util/data';
import { createSlug } from '../../util/urlHelpers';
import { createResourceLocatorString } from '../../util/routes';
import {
  InlineTextButton,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  ListingLink,
  IconSpinner,
  ResponsiveImage,
} from '../../components';
import config from '../../config';

import MenuIcon from './MenuIcon';
import css from './ManageListingCard.css';

// Menu content needs the same padding
const MENU_CONTENT_OFFSET = -12;
const MAX_LENGTH_FOR_WORDS_IN_TITLE = 7;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ManageListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ManageListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

const createURL = (routes, listing) => {
  const id = listing.id.uuid;
  const slug = createSlug(listing.attributes.title);
  const pathParams = { id, slug, type: 'edit', tab: 'description' };

  return createResourceLocatorString('EditListingPage', routes, pathParams, {});
};

// Cards are not fixed sizes - So, long words in title make flexboxed items to grow too big.
// 1. We split title to an array of words and spaces.
//    "foo bar".split(/([^\s]+)/gi) => ["", "foo", " ", "bar", ""]
// 2. Then we break long words by adding a '<span>' with word-break: 'break-all';
const formatTitle = (title, maxLength) => {
  const nonWhiteSpaceSequence = /([^\s]+)/gi;
  return title.split(nonWhiteSpaceSequence).map((word, index) => {
    return word.length > maxLength ? (
      <span key={index} style={{ wordBreak: 'break-all' }}>
        {word}
      </span>
    ) : (
      word
    );
  });
};

export const ManageListingCardComponent = props => {
  const {
    className,
    rootClassName,
    hasClosingError,
    hasOpeningError,
    history,
    intl,
    isMenuOpen,
    actionsInProgressListingId,
    listing,
    onCloseListing,
    onOpenListing,
    onToggleMenu,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price, state } = currentListing.attributes;
  const isPendingApproval = state === LISTING_STATE_PENDING_APPROVAL;
  const isClosed = state === LISTING_STATE_CLOSED;
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

  const menuItemClasses = classNames(css.menuItem, {
    [css.menuItemDisabled]: !!actionsInProgressListingId,
  });

  const { formattedPrice, priceTitle } = priceData(price, intl);

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  const closedOverlay = !isClosed ? null : (
    <div
      className={css.closedOverlayWrapper}
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div className={css.closedOverlay} />
      <div className={css.closedOverlayContent}>
        <div className={css.closedMessage}>
          <FormattedMessage id="ManageListingCard.closedListing" />
        </div>
        <button
          className={css.openListingButton}
          disabled={!!actionsInProgressListingId}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            if (!actionsInProgressListingId) {
              onOpenListing(currentListing.id);
            }
          }}
        >
          <FormattedMessage id="ManageListingCard.openListing" />
        </button>
      </div>
    </div>
  );

  const errorOverlay =
    hasOpeningError || hasClosingError ? (
      <div
        className={css.errorOverlayWrapper}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className={css.errorOverlay} />
        <div className={css.errorOverlayContent}>
          <div className={css.closedMessage}>
            <FormattedMessage id="ManageListingCard.actionFailed" />
          </div>
        </div>
      </div>
    ) : null;

  const pendingApprovalOverlay = isPendingApproval ? (
    <div
      className={css.pendingApprovalOverlayWrapper}
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div className={css.pendingApprovalOverlay} />
      <div className={css.pendingApprovalOverlayContent}>
        <div className={css.pendingMessage}>
          <FormattedMessage
            id="ManageListingCard.pendingApproval"
            values={{ listingTitle: title }}
          />
        </div>
      </div>
    </div>
  ) : null;

  const thisInProgress = actionsInProgressListingId && actionsInProgressListingId.uuid === id;
  const loadingOrErrorOverlay = thisInProgress ? (
    <div
      className={css.loadingOverlayWrapper}
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div className={css.loadingOverlay} />
      <div className={css.loadingOverlayContent}>
        <IconSpinner />
      </div>
    </div>
  ) : (
    errorOverlay
  );
  /* eslint-enable jsx-a11y/no-static-element-interactions */

  const titleClasses = classNames(css.title, {
    [css.titlePending]: isPendingApproval,
  });

  return (
    <ListingLink className={classes} listing={listing}>
      <div className={css.threeToTwoWrapper}>
        <div className={css.aspectWrapper}>
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            nameSet={[
              { name: 'landscape-crop', size: '1x' },
              { name: 'landscape-crop2x', size: '2x' },
            ]}
          />
        </div>
        <div className={classNames(css.menuOverlayWrapper, { [css.menuOverlayOpen]: isMenuOpen })}>
          <div className={classNames(css.menuOverlay)} />
          <div className={css.menuOverlayContent}>
            <FormattedMessage id="ManageListingCard.viewListing" />
          </div>
        </div>
        <div className={css.menubarWrapper}>
          <div className={css.menubarGradient} />
          <div className={css.menubar}>
            <Menu
              className={classNames(css.menu, { [css.cardIsOpen]: !isClosed })}
              contentPlacementOffset={MENU_CONTENT_OFFSET}
              contentPosition="left"
              useArrow={false}
              onToggleActive={isOpen => {
                const listingOpen = isOpen ? currentListing : null;
                onToggleMenu(listingOpen);
              }}
              isOpen={isMenuOpen}
            >
              <MenuLabel className={css.menuLabel} isOpenClassName={css.listingMenuIsOpen}>
                <div className={css.iconWrapper}>
                  <MenuIcon className={css.menuIcon} isActive={isMenuOpen} />
                </div>
              </MenuLabel>
              <MenuContent rootClassName={css.menuContent}>
                <MenuItem key="close-listing">
                  <InlineTextButton
                    className={menuItemClasses}
                    onClick={event => {
                      event.preventDefault();
                      event.stopPropagation();
                      if (!actionsInProgressListingId) {
                        onToggleMenu(null);
                        onCloseListing(currentListing.id);
                      }
                    }}
                  >
                    <FormattedMessage id="ManageListingCard.closeListing" />
                  </InlineTextButton>
                </MenuItem>
              </MenuContent>
            </Menu>
          </div>
        </div>
        {closedOverlay}
        {pendingApprovalOverlay}
        {loadingOrErrorOverlay}
      </div>
      <div className={css.info}>
        <div className={css.price}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.perUnit}>
            <FormattedMessage id="ManageListingCard.perUnit" />
          </div>
        </div>
        <div className={css.mainInfo}>
          <div className={titleClasses}>{formatTitle(title, MAX_LENGTH_FOR_WORDS_IN_TITLE)}</div>
        </div>
        <button
          className={css.edit}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            history.push(createURL(routeConfiguration(), listing));
          }}
        >
          <FormattedMessage id="ManageListingCard.edit" />
        </button>
      </div>
    </ListingLink>
  );
};

ManageListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  actionsInProgressListingId: null,
};

const { bool, func, shape, string } = PropTypes;

ManageListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  hasClosingError: bool.isRequired,
  hasOpeningError: bool.isRequired,
  intl: intlShape.isRequired,
  listing: propTypes.ownListing.isRequired,
  isMenuOpen: bool.isRequired,
  actionsInProgressListingId: shape({ uuid: string.isRequired }),
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  onToggleMenu: func.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default compose(withRouter, injectIntl)(ManageListingCardComponent);
