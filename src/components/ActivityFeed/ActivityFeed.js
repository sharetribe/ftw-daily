import React from 'react';
import { string, arrayOf, bool, func } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { Avatar } from '../../components';
import { formatDate } from '../../util/dates';
import { ensureTransaction, ensureUser } from '../../util/data';
import * as propTypes from '../../util/propTypes';

import css from './ActivityFeed.css';

const Message = props => {
  const { message, intl } = props;
  const todayString = intl.formatMessage({ id: 'ActivityFeed.today' });
  return (
    <div className={css.message}>
      <Avatar className={css.avatar} user={message.sender} />
      <div>
        <p className={css.messageContent}>{message.attributes.content}</p>
        <p className={css.messageDate}>{formatDate(intl, todayString, message.attributes.at)}</p>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: propTypes.message.isRequired,
  intl: intlShape.isRequired,
};

const OwnMessage = props => {
  const { message, intl } = props;
  const todayString = intl.formatMessage({ id: 'ActivityFeed.today' });
  return (
    <div className={css.ownMessage}>
      <div className={css.ownMessageContentWrapper}>
        <p className={css.ownMessageContent}>{message.attributes.content}</p>
      </div>
      <p className={css.ownMessageDate}>{formatDate(intl, todayString, message.attributes.at)}</p>
    </div>
  );
};

OwnMessage.propTypes = {
  message: propTypes.message.isRequired,
  intl: intlShape.isRequired,
};

const Transition = props => {
  const { transition, currentUser, customer, provider, listingTitle, intl } = props;

  const resolveTransitionMessage = (transition, ownRole, otherUsersName, intl) => {
    const isOwnTransition = transition.by === ownRole;
    const transitionType = transition.transition;
    const displayName = otherUsersName;

    switch (transitionType) {
      case propTypes.TX_TRANSITION_PREAUTHORIZE:
        return isOwnTransition
          ? intl.formatMessage({ id: 'ActivityFeed.ownTransitionRequest' }, { listingTitle })
          : intl.formatMessage(
              { id: 'ActivityFeed.transitionRequest' },
              { displayName, listingTitle }
            );
      case propTypes.TX_TRANSITION_ACCEPT:
        return isOwnTransition
          ? intl.formatMessage({ id: 'ActivityFeed.ownTransitionAccept' })
          : intl.formatMessage({ id: 'ActivityFeed.transitionAccept' }, { displayName });
      case propTypes.TX_TRANSITION_DECLINE:
        return isOwnTransition
          ? intl.formatMessage({ id: 'ActivityFeed.ownTransitionDecline' })
          : intl.formatMessage({ id: 'ActivityFeed.transitionDecline' }, { displayName });
      case propTypes.TX_TRANSITION_AUTO_DECLINE:
        return ownRole === propTypes.TX_TRANSITION_ACTOR_PROVIDER
          ? intl.formatMessage({ id: 'ActivityFeed.ownTransitionAutoDecline' })
          : intl.formatMessage({ id: 'ActivityFeed.transitionAutoDecline' }, { displayName });
      case propTypes.TX_TRANSITION_MARK_DELIVERED:
        return intl.formatMessage({ id: 'ActivityFeed.transitionComplete' });
      case propTypes.TX_TRANSITION_CANCEL:
        return intl.formatMessage({ id: 'ActivityFeed.transitionCancel' });

      default:
        return '';
    }
  };

  const ownRole =
    currentUser.id.uuid === customer.id.uuid
      ? propTypes.TX_TRANSITION_ACTOR_CUSTOMER
      : propTypes.TX_TRANSITION_ACTOR_PROVIDER;

  const otherUsersName =
    ownRole === propTypes.TX_TRANSITION_ACTOR_CUSTOMER
      ? provider.attributes.profile.displayName
      : customer.attributes.profile.displayName;

  const transitionMessage = resolveTransitionMessage(transition, ownRole, otherUsersName, intl);
  const todayString = intl.formatMessage({ id: 'ActivityFeed.today' });

  return (
    <div className={css.transition}>
      <div className={css.bullet}>
        <p className={css.transitionContent}>•</p>
      </div>
      <div>
        <p className={css.transitionContent}>{transitionMessage}</p>
        <p className={css.transitionDate}>{formatDate(intl, todayString, transition.at)}</p>
      </div>
    </div>
  );
};

Transition.propTypes = {
  transition: propTypes.txTransition.isRequired,
  currentUser: propTypes.currentUser.isRequired,
  customer: propTypes.user.isRequired,
  provider: propTypes.user.isRequired,
  listingTitle: string.isRequired,
  intl: intlShape.isRequired,
};

const EmptyTransition = () => {
  return (
    <div className={css.transition}>
      <div className={css.bullet}>
        <p className={css.transitionContent}>•</p>
      </div>
      <div>
        <p className={css.transitionContent} />
        <p className={css.transitionDate} />
      </div>
    </div>
  );
};

export const ActivityFeedComponent = props => {
  const { rootClassName, className, messages, transaction, currentUser, intl } = props;
  const classes = classNames(rootClassName || css.root, className);

  const currentTransaction = ensureTransaction(transaction);
  const transitions = currentTransaction.attributes.transitions
    ? currentTransaction.attributes.transitions
    : [];
  const currentCustomer = ensureUser(currentTransaction.customer);
  const currentProvider = ensureUser(currentTransaction.provider);

  const transitionsAvailable =
    currentUser && currentUser.id && currentCustomer.id && currentProvider.id;

  const isMessage = item => item && item.type === 'message';

  // Compare function for sorting an array containint messages and transitions
  const compareItems = (a, b) => {
    const itemDate = item => (isMessage(item) ? item.attributes.at : item.at);
    return itemDate(a) - itemDate(b);
  };

  // combine messages and transaction transitions
  const items = messages.concat(transitions).sort(compareItems);

  const transitionComponent = transition => {
    if (transitionsAvailable) {
      return (
        <Transition
          transition={transition}
          currentUser={currentUser}
          customer={currentCustomer}
          provider={currentProvider}
          listingTitle={currentTransaction.listing.attributes.title}
          intl={intl}
        />
      );
    } else {
      return <EmptyTransition />;
    }
  };

  const messageComponent = message => {
    const isOwnMessage =
      message.sender &&
      message.sender.id &&
      currentUser &&
      currentUser.id &&
      message.sender.id.uuid === currentUser.id.uuid;
    if (isOwnMessage) {
      return <OwnMessage message={message} intl={intl} />;
    }
    return <Message message={message} intl={intl} />;
  };

  const messageListItem = message => {
    return (
      <li id={`msg-${message.id.uuid}`} key={message.id.uuid} className={css.messageItem}>
        {messageComponent(message)}
      </li>
    );
  };

  const transitionListItem = transition => {
    return (
      <li key={transition.transition} className={css.transitionItem}>
        {transitionComponent(transition)}
      </li>
    );
  };

  return (
    <ul className={classes}>
      {items.map(item => {
        if (isMessage(item)) {
          return messageListItem(item);
        } else {
          return transitionListItem(item);
        }
      })}
    </ul>
  );
};

ActivityFeedComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

ActivityFeedComponent.propTypes = {
  rootClassName: string,
  className: string,

  currentUser: propTypes.currentUser,
  transaction: propTypes.transaction,
  messages: arrayOf(propTypes.message),
  hasOlderMessages: bool.isRequired,
  onShowOlderMessages: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ActivityFeed = injectIntl(ActivityFeedComponent);

export default ActivityFeed;
