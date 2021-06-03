import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './NotificationBadge.module.css';

const NotificationBadge = props => {
  const { className, rootClassName, count } = props;
  const classes = classNames(rootClassName || css.root, className);

  return <span className={classes}>{count}</span>;
};

const { number, string } = PropTypes;

NotificationBadge.defaultProps = {
  className: null,
  rootClassName: null,
};

NotificationBadge.propTypes = {
  count: number.isRequired,
  className: string,
  rootClassName: string,
};

export default NotificationBadge;
