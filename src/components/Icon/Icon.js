import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import css from './Icon.css'
import ReactTooltip from 'react-tooltip'

const Icon = props => {
  const { icon, message } = props;
  return (
    <div>
      <FontAwesomeIcon data-tip={message} className={css.icon} icon={icon} />
      <ReactTooltip />
    </div>
  );
};

export default Icon;
