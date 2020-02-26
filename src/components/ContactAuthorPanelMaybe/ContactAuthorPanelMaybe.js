import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureUser, ensureCurrentUser } from '../../util/data';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';

import css from './ContactAuthorPanelMaybe.css';

const ContactAuthorPanel = ({
  author,
  onContactUser,
  unitType,
  currentUser,
  className,
  formattedPrice,
}) => {
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const unitTranslationKey = isNightly
    ? 'BookingPanel.perNight'
    : isDaily
    ? 'BookingPanel.perDay'
    : 'BookingPanel.perUnit';
  const userIsCurrentUser = author && author.type === 'currentUser';
  const displayName = author.attributes.profile.displayName
  return (
    <div className={className}>
      <div className={css.textContainer}>
        <div className={css.priceValue}>{formattedPrice}</div>
        <div className={css.perUnit}>
          <FormattedMessage id={unitTranslationKey} />
        </div>
        <h2 className={css.contactAuthorTitle}>
          <FormattedMessage
           id="ListingPage.contactAuthorTitle" 
           values={{ user: displayName && displayName.split(" ").slice(0,1)[0] }}
           />
        </h2>
        <p className={css.contactAuthorText}>
          <FormattedMessage id="ListingPage.contactAuthorText" />
        </p>
      </div>
      <button className={css.contactButton} onClick={onContactUser}>
        <FormattedMessage id="ListingPage.contactAuthorButton" />
      </button>
    </div>
  );
};

export default ContactAuthorPanel;
