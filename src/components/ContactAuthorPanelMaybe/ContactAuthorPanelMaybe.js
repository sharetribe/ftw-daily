import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureUser, ensureCurrentUser } from '../../util/data';

import css from './ContactAuthorPanelMaybe.css';

const ContactAuthorPanel = ({ author, onContactUser, currentUser, className }) => {
  console.log(author);

  const userIsCurrentUser = author && author.type === 'currentUser';
  const ensuredUser = userIsCurrentUser ? ensureCurrentUser(author) : ensureUser(author);
  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const isCurrentUser =
    ensuredUser.id && ensuredCurrentUser.id && ensuredUser.id.uuid === ensuredCurrentUser.id.uuid;

  if (isCurrentUser) return null;

  return (
    <div className={className}>
      <h2>
        <FormattedMessage id="ListingPage.contactAuthorTitle" />
      </h2>
      <p>
        <FormattedMessage id="ListingPage.contactAuthorText" />
      </p>
      <button className={css.contactButton} onClick={onContactUser}>
        <FormattedMessage id="ListingPage.contactAuthorButton" />
      </button>
    </div>
  );
};

export default ContactAuthorPanel;
