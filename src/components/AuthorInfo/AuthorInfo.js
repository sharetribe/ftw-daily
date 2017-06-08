import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Avatar } from '../../components';
import * as propTypes from '../../util/propTypes';
import { ensureUser } from '../../util/data';
import css from './AuthorInfo.css';

const AuthorInfo = props => {
  const { className, author } = props;
  const classes = classNames(css.root, className);
  const currentAuthor = ensureUser(author);
  const { firstName, lastName } = currentAuthor.attributes.profile;

  return (
    <div className={classes}>
      <div className={css.avatarWrapper}>
        <Avatar firstName={firstName} lastName={lastName} />
      </div>
      <div className={css.authorDetails}>
        <span className={css.authorName}>
          <FormattedMessage id="AuthorInfo.host" values={{ firstName, lastName }} />
        </span>
      </div>
    </div>
  );
};

const { string } = PropTypes;
AuthorInfo.defaultProps = { className: null };
AuthorInfo.propTypes = { author: propTypes.user.isRequired, className: string };

export default AuthorInfo;
