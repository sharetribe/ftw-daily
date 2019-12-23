import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureUser, ensureCurrentUser } from '../../util/data';
import {  LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';

import css from './ContactAuthorPanelMaybe.css';


const ContactAuthorPanel = ({ author, onContactUser,unitType, currentUser, className, formattedPrice }) => {
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const unitTranslationKey = isNightly
    ? 'BookingPanel.perNight'
    : isDaily
    ? 'BookingPanel.perDay'
    : 'BookingPanel.perUnit';
  const userIsCurrentUser = author && author.type === 'currentUser';

  return (
    <div className={className}>
      <button className={css.contactButton} onClick={onContactUser}>
        <FormattedMessage id="ListingPage.contactAuthorButton" />
      </button>
    </div>
  );
};

export default ContactAuthorPanel;
