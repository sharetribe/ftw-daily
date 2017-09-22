import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { formatMoney } from '../../util/currency';
import { ensureListing } from '../../util/data';
import { createSlug } from '../../util/urlHelpers';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { createResourceLocatorString } from '../../util/routes';
import {
  InlineTextButton,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
  IconSpinner,
  ResponsiveImage,
} from '../../components';
import config from '../../config';

import MenuIcon from './MenuIcon';
import css from './ManageListingCard.css';

// Menu content needs the same padding
const MENU_CONTENT_OFFSET = -12;

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

const createURL = (flattenedRoutes, listing) => {
  const id = listing.id.uuid;
  const slug = createSlug(listing.attributes.title);
  const pathParams = { id, slug, type: 'edit', tab: 'description' };

  return createResourceLocatorString('EditListingPage', flattenedRoutes, pathParams, {});
};

export const ManageListingCardComponent = props => {
  const {
    className,
    rootClassName,
    flattenedRoutes,
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
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price, open } = currentListing.attributes;
  const slug = createSlug(title);
  const firstImage = currentListing.images && currentListing.images.length > 0
    ? currentListing.images[0]
    : null;

  const menuItemClasses = classNames(css.menuItem, {
    [css.menuItemDisabled]: !!actionsInProgressListingId,
  });

  // TODO: Currently, API can return currencies that are not supported by starter app.
  const { formattedPrice, priceTitle } = priceData(price, intl);

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  const closedOverlay = open
    ? null
    : <div
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
      </div>;

  const errorOverlay = hasOpeningError || hasClosingError
    ? <div
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
    : null;

  const thisInProgress = actionsInProgressListingId && actionsInProgressListingId.uuid === id;
  const loadingOrErrorOverlay = thisInProgress
    ? <div
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
    : errorOverlay;
  /* eslint-enable jsx-a11y/no-static-element-interactions */

  return (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
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
              className={classNames(css.menu, { [css.cardIsOpen]: open })}
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
        {loadingOrErrorOverlay}
      </div>
      <div className={css.info}>
        <div className={css.price}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.perNight}>
            <FormattedMessage id="ManageListingCard.perNight" />
          </div>
        </div>
        <div className={css.mainInfo}>
          <div className={css.title}>
            {title}
          </div>
        </div>
        <button
          className={css.edit}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            history.push(createURL(flattenedRoutes, listing));
          }}
        >
          <FormattedMessage id="ManageListingCard.edit" />
        </button>
      </div>
    </NamedLink>
  );
};

ManageListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  actionsInProgressListingId: null,
};

const { arrayOf, bool, func, shape, string } = PropTypes;

ManageListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  hasClosingError: bool.isRequired,
  hasOpeningError: bool.isRequired,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,
  isMenuOpen: bool.isRequired,
  actionsInProgressListingId: shape({ uuid: string.isRequired }),
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  onToggleMenu: func.isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route).isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default compose(withRouter, withFlattenedRoutes, injectIntl)(ManageListingCardComponent);
