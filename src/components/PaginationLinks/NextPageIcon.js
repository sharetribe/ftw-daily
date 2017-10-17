import React from 'react';
import PropTypes from 'prop-types';

const NextPageIcon = props => {
  const { className } = props;

  return (
    <svg
      className={className}
      width="11"
      height="15"
      viewBox="0 0 11 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6 14c-.17 0-.34-.065-.458-.192-.214-.228-.182-.57.07-.764L8.472 7.5 1.21 1.955c-.252-.194-.284-.535-.07-.763.214-.23.592-.257.846-.064l7.8 5.958c.135.104.212.255.212.414 0 .16-.077.31-.212.414l-7.8 5.958c-.113.086-.25.128-.388.128"
        fillRule="evenodd"
      />
    </svg>
  );
};

const { string } = PropTypes;

NextPageIcon.defaultProps = {
  className: null,
};

NextPageIcon.propTypes = {
  className: string,
};

export default NextPageIcon;
