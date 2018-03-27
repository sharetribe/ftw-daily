import React from 'react';
import PropTypes from 'prop-types';

const IconLogo = props => {
  const { className, ...rest } = props;

  return (
    <svg
      className={className}
      {...rest}
      width="21"
      height="25"
      viewBox="0 0 21 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.063 23.646c-2.286 0-4.025-1.852-4.025-4.138 0-3.342 2.405-6.49 5.69-7.246-1.875 1.382-1.77 4.06-1.032 5.176.506-.416.956-.87 1.033-1.55 1.727.68 2.358 2.147 2.358 3.733 0 2.288-1.74 4.026-4.025 4.026m9.64-12.442c-.108-.352-.536-.467-.807-.24-.7.592-1.47 1.063-2.3 1.406-.21-6.144-4.754-11.247-10.8-12.214-.42-.066-.73.385-.514.753 1.53 2.598 1.656 5.74.443 8.395-.59-.816-1.033-1.717-1.32-2.686-.1-.342-.522-.482-.805-.244C1.313 8.29 0 11.1 0 14.086c0 5.62 4.553 10.063 10.063 10.063 5.548 0 10.062-4.514 10.062-10.063 0-.982-.143-1.952-.423-2.883"
        fillRule="evenodd"
      />
    </svg>
  );
};

const { string } = PropTypes;

IconLogo.defaultProps = {
  className: null,
};

IconLogo.propTypes = {
  className: string,
};

export default IconLogo;
