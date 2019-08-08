import React, { useState } from 'react';
import { func, object, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from 'react-intl';
import {
  IconArrowHead,
  IconCard,
  IconClose,
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

const SavedCardDetails = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [arrowDeg, setArrowDeg] = useState(90);
  const [active, setActive] = useState(DEFAULT_CARD);

  const {
    rootClassName,
    className,
    intl,
    card,
    onChange,
    onDeleteCard,
    onManageDisableScrolling,
    deleteInProgress,
  } = props;

  const { last4Digits, expirationMonth, expirationYear, brand } = card || {};
  const classes = classNames(rootClassName || css.root, className);

  const paymentMethodPlaceholderDesktop = intl.formatMessage(
    { id: 'SavedCardDetails.savedPaymentMethodPlaceholderDesktop' },
    { lastFour: last4Digits }
  );

  const paymentMethodPlaceholderMobile = intl.formatMessage(
    { id: 'SavedCardDetails.savedPaymentMethodPlaceholderMobile' },
    { lastFour: last4Digits }
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
    { lastFour: last4Digits }
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

  const handleClick = item => {
    setActive(item);
    setMenuOpen(false);
    if (onChange) {
      onChange(item);
    }
  };

  const onToggleActive = isOpen => {
    setArrowDeg(arrowDeg + 180);
    setMenuOpen(isOpen);
  };

  const handleDeleteCard = () => {
    setIsOpen(true);
  };

  const arrowStyle = {
    transform: `rotate(${arrowDeg}deg)`,
    transition: 'transform 0.5s ease-out',
  };

  const replaceCardTitle = intl.formatMessage({
    id: 'SavedCardDetails.replaceCardTitle',
  });
  const removeCardModalTitle = intl.formatMessage({ id: 'SavedCardDetails.removeCardModalTitle' });
  const removeCardModalContent = intl.formatMessage({
    id: 'SavedCardDetails.removeCardModalContent',
  });
  const cancel = intl.formatMessage({ id: 'SavedCardDetails.cancel' });
  const removeCard = intl.formatMessage({ id: 'SavedCardDetails.removeCard' });
  const deletePaymentMethod = intl.formatMessage({ id: 'SavedCardDetails.deletePaymentMethod' });

  const showExpired = isCardExpired && active === DEFAULT_CARD;

  return (
    <div className={classes}>
      <Menu className={css.menu} isOpen={menuOpen} onToggleActive={onToggleActive}>
        <MenuLabel className={css.menuLabel}>
          <div className={showExpired ? css.menuLabelWrapperExpired : css.menuLabelWrapper}>
            {active === DEFAULT_CARD ? defaultCard : replaceCard}
            <span style={arrowStyle}>
              <IconArrowHead direction="right" size="small" rootClassName={css.arrowIcon} />
            </span>
          </div>
        </MenuLabel>

        <MenuContent className={css.menuContent}>
          <MenuItem key="first item" className={css.menuItem}>
            <InlineTextButton className={css.menuText} onClick={() => handleClick(DEFAULT_CARD)}>
              {defaultCard}
            </InlineTextButton>
          </MenuItem>
          <MenuItem key="divider" className={css.menuDivider}>
            {replaceCardTitle}
          </MenuItem>
          <MenuItem key="second item" className={css.menuItem}>
            <InlineTextButton className={css.menuText} onClick={() => handleClick(REPLACE_CARD)}>
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

      <Modal
        id="VerifyDeletingPaymentMethod"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        contentClassName={css.modalContent}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <div>
          <div className={css.modalTitle}>{removeCardModalTitle}</div>
          <p className={css.modalMessage}>{removeCardModalContent}</p>
          <div className={css.modalButtonsWrapper}>
            <div onClick={() => setIsOpen(false)} className={css.cancelCardDelete}>
              {cancel}
            </div>
            <Button onClick={onDeleteCard} inProgress={deleteInProgress}>
              {removeCard}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

SavedCardDetails.defaultProps = {
  rootClassName: null,
  className: null,
  card: null,
  onChange: null,
  onDeleteCard: null,
  onManageDisableScrolling: () => null,
};

SavedCardDetails.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
  card: object,
  onChange: func,
  onDeleteCard: func,
  onManageDisableScrolling: func,
};

export default injectIntl(SavedCardDetails);
