import React from 'react';
import PropTypes from 'prop-types';

const PrevPageIcon = props => {
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
        d="M9.4 1c.17 0 .34.065.458.192.214.228.182.57-.07.764L2.528 7.5l7.26 5.545c.252.194.284.535.07.763-.214.23-.592.257-.846.064l-7.8-5.958C1.077 7.81 1 7.66 1 7.5c0-.16.077-.31.212-.414l7.8-5.958C9.125 1.042 9.262 1 9.4 1"
        fillRule="evenodd"
      />
    </svg>
  );
};

const { string } = PropTypes;

PrevPageIcon.defaultProps = {
  className: null,
};

PrevPageIcon.propTypes = {
  className: string,
};

export default PrevPageIcon;
