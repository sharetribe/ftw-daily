import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Avatar } from '../../components';
import * as propTypes from '../../util/propTypes';
import css from './AuthorInfo.css';

const AuthorInfo = props => {
  const { className, author } = props;
  const classes = classNames(css.root, className);
  const currentAuthor = { id: null, type: 'user', attributes: {}, ...author };

  const authorName = currentAuthor.attributes.profile
    ? `${currentAuthor.attributes.profile.firstName} ${currentAuthor.attributes.profile.lastName}`
    : '';

  return (
    <div className={classes}>
      <div className={css.avatarWrapper}>
        <Avatar name={authorName} />
      </div>
      <div className={css.authorDetails}>
        <span className={css.authorName}>
          <FormattedMessage id="AuthorInfo.host" values={{ authorName }} />
        </span>
      </div>
    </div>
  );
};

const { string } = PropTypes;
AuthorInfo.defaultProps = { className: null };
AuthorInfo.propTypes = { author: propTypes.user.isRequired, className: string };

export default AuthorInfo;
