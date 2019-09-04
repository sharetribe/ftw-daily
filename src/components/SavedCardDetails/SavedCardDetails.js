import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { bool, func, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from '../../util/reactIntl';
import {
  IconArrowHead,
  IconCard,
  IconClose,
  IconCheckmark,
  Button,
  InlineTextButton,
  Menu,
  MenuLabel,
  MenuItem,
  MenuContent,
  Modal,
} from '../../components';
import css from './SavedCardDetails.css';

const DEFAULT_CARD = 'defaultCard';
const REPLACE_CARD = 'replaceCard';

// TODO: change all the modals to use portals at some point.
// Portal is used here to circumvent the problems that rise
// from different levels of z-indexes in DOM tree. In this case
// either TopBar or Menu element were overlapping the modal due
// to stacking context. All the modals should be made with portals
// but portals didn't exist when we originally created modals.

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    this.props.portalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.props.portalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

const SavedCardDetails = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(DEFAULT_CARD);
  const [portalRoot, setPortalRoot] = useState(null);

  const {
    rootClassName,
    className,
    intl,
    card,
    onChange,
    onDeleteCard,
    onManageDisableScrolling,
    deletePaymentMethodInProgress,
  } = props;

  const { last4Digits, expirationMonth, expirationYear, brand } = card || {};
  const classes = classNames(rootClassName || css.root, className);

  const paymentMethodPlaceholderDesktop = intl.formatMessage(
    { id: 'SavedCardDetails.savedPaymentMethodPlaceholderDesktop' },
    { last4Digits }
  );

  const paymentMethodPlaceholderMobile = intl.formatMessage(
    { id: 'SavedCardDetails.savedPaymentMethodPlaceholderMobile' },
    { last4Digits }
  );

  const paymentMethodPlaceholder = (
    <>
      <span className={css.paymentMethodPlaceholderDesktop}>{paymentMethodPlaceholderDesktop}</span>
      <span className={css.paymentMethodPlaceholderMobile}>{paymentMethodPlaceholderMobile}</span>
    </>
  );

  const replaceCardText = intl.formatMessage({
    id: 'SavedCardDetails.replaceCardText',
  });
  const replaceCard = (
    <span>
      <IconCard brand="none" className={css.cardIcon} /> {replaceCardText}
    </span>
  );

  const expiredCardText = intl.formatMessage(
    { id: 'SavedCardDetails.expiredCardText' },
    { last4Digits }
  );
  const expiredText = <div className={css.cardExpiredText}>{expiredCardText}</div>;

  const isExpired = (expirationMonth, expirationYear) => {
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    const currentMonth = currentTime.getMonth() + 1; //getMonth() method returns the month (from 0 to 11)

    if (expirationYear < currentYear) {
      return true;
    } else if (expirationYear === currentYear && expirationMonth < currentMonth) {
      return true;
    }

    return false;
  };

  const isCardExpired =
    expirationMonth && expirationYear && isExpired(expirationMonth, expirationYear);

  const defaultCard = (
    <div className={css.savedPaymentMethod}>
      <IconCard brand={brand} className={css.cardIcon} />
      {paymentMethodPlaceholder}
      <span className={isCardExpired ? css.expirationDateExpired : css.expirationDate}>
        {expirationMonth}/{expirationYear.toString().substring(2)}
      </span>
    </div>
  );

  const handleClick = item => e => {
    // Clicking buttons inside a form will call submit
    e.preventDefault();
    e.stopPropagation();

    setActive(item);
    setMenuOpen(false);
    if (onChange) {
      onChange(item);
    }
  };

  const onToggleActive = isOpen => {
    setMenuOpen(isOpen);
  };

  const handleDeleteCard = () => {
    setIsModalOpen(true);
  };

  const iconArrowClassName = menuOpen ? css.IconArrowAnimation : null;

  const replaceCardTitle = intl.formatMessage({
    id: 'SavedCardDetails.replaceCardTitle',
  });
  const removeCardModalTitle = intl.formatMessage({ id: 'SavedCardDetails.removeCardModalTitle' });
  const removeCardModalContent = intl.formatMessage(
    { id: 'SavedCardDetails.removeCardModalContent' },
    { last4Digits }
  );
  const cancel = intl.formatMessage({ id: 'SavedCardDetails.cancel' });
  const removeCard = intl.formatMessage({ id: 'SavedCardDetails.removeCard' });
  const deletePaymentMethod = intl.formatMessage({ id: 'SavedCardDetails.deletePaymentMethod' });

  const showExpired = isCardExpired && active === DEFAULT_CARD;

  const setPortalRootAfterInitialRender = () => {
    setPortalRoot(document.getElementById('portal-root'));
  };
  return (
    <div className={classes} ref={setPortalRootAfterInitialRender}>
      <Menu className={css.menu} isOpen={menuOpen} onToggleActive={onToggleActive} useArrow={false}>
        <MenuLabel className={css.menuLabel}>
          <div className={showExpired ? css.menuLabelWrapperExpired : css.menuLabelWrapper}>
            {active === DEFAULT_CARD ? defaultCard : replaceCard}
            <span>
              <IconArrowHead
                direction="down"
                size="small"
                rootClassName={css.iconArrow}
                className={iconArrowClassName}
              />
            </span>
          </div>
        </MenuLabel>

        <MenuContent rootClassName={css.menuContent}>
          <MenuItem key="first item" className={css.menuItem}>
            <IconCheckmark
              className={active === DEFAULT_CARD ? css.iconCheckmark : css.iconCheckmarkHidden}
              size="small"
            />
            <InlineTextButton className={css.menuText} onClick={handleClick(DEFAULT_CARD)}>
              {defaultCard}
            </InlineTextButton>
          </MenuItem>
          <MenuItem key="divider" className={css.menuDivider}>
            {replaceCardTitle}
          </MenuItem>
          <MenuItem key="second item" className={css.menuItem}>
            <IconCheckmark
              className={active === REPLACE_CARD ? css.iconCheckmark : css.iconCheckmarkHidden}
              size="small"
            />
            <InlineTextButton
              className={css.menuTextReplaceCard}
              onClick={handleClick(REPLACE_CARD)}
            >
              {replaceCard}
            </InlineTextButton>
          </MenuItem>
        </MenuContent>
      </Menu>
      {showExpired && !menuOpen ? expiredText : null}

      {onDeleteCard && active !== REPLACE_CARD ? (
        <InlineTextButton onClick={handleDeleteCard} className={css.savedPaymentMethodDelete}>
          <IconClose rootClassName={css.closeIcon} size="small" />
          {deletePaymentMethod}
        </InlineTextButton>
      ) : null}

      {portalRoot && onManageDisableScrolling ? (
        <Portal portalRoot={portalRoot}>
          <Modal
            id="VerifyDeletingPaymentMethod"
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
            contentClassName={css.modalContent}
            onManageDisableScrolling={onManageDisableScrolling}
          >
            <div>
              <div className={css.modalTitle}>{removeCardModalTitle}</div>
              <p className={css.modalMessage}>{removeCardModalContent}</p>
              <div className={css.modalButtonsWrapper}>
                <div onClick={() => setIsModalOpen(false)} className={css.cancelCardDelete}>
                  {cancel}
                </div>
                <Button onClick={onDeleteCard} inProgress={deletePaymentMethodInProgress}>
                  {removeCard}
                </Button>
              </div>
            </div>
          </Modal>
        </Portal>
      ) : null}
    </div>
  );
};

SavedCardDetails.defaultProps = {
  rootClassName: null,
  className: null,
  card: null,
  onChange: null,
  onDeleteCard: null,
  deletePaymentMethodInProgress: false,
  onManageDisableScrolling: null,
};

SavedCardDetails.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
  card: shape({
    brand: string.isRequired,
    expirationMonth: number.isRequired,
    expirationYear: number.isRequired,
    last4Digits: string.isRequired,
  }),
  onChange: func,
  onDeleteCard: func,
  onManageDisableScrolling: func,
  deletePaymentMethodInProgress: bool,
};

export default injectIntl(SavedCardDetails);
