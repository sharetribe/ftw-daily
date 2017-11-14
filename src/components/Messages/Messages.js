import React from 'react';
import { string, arrayOf } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { Avatar } from '../../components';
import { formatDate } from '../../util/dates';
import * as propTypes from '../../util/propTypes';

import css from './Messages.css';

const Message = props => {
  const { message, intl } = props;
  const todayString = intl.formatMessage({ id: 'Messages.today' });
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
  const todayString = intl.formatMessage({ id: 'Messages.today' });
  return (
    <div className={css.ownMessage}>
      <p className={css.ownMessageContent}>{message.attributes.content}</p>
      <p className={css.ownMessageDate}>{formatDate(intl, todayString, message.attributes.at)}</p>
    </div>
  );
};

OwnMessage.propTypes = {
  message: propTypes.message.isRequired,
  intl: intlShape.isRequired,
};

export const MessagesComponent = props => {
  const { rootClassName, className, messages, currentUser, intl } = props;
  const classes = classNames(rootClassName || css.root, className);

  const msg = message => {
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

  return (
    <ul className={classes}>
      {messages.map(m => (
        <li id={`msg-${m.id.uuid}`} key={m.id.uuid} className={css.messageItem}>
          {msg(m)}
        </li>
      ))}
    </ul>
  );
};

MessagesComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

MessagesComponent.propTypes = {
  rootClassName: string,
  className: string,

  messages: arrayOf(propTypes.message),
  currentUser: propTypes.currentUser,

  // from injectIntl
  intl: intlShape.isRequired,
};

const Messages = injectIntl(MessagesComponent);

export default Messages;
