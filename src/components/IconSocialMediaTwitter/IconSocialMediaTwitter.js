import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSocialMediaTwitter.module.css';

const IconSocialMediaTwitter = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg
      className={classes}
      width="16"
      height="14"
      viewBox="0 0 16 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.956 2.37c-.513.225-1.07.388-1.647.45.592-.36 1.044-.928 1.257-1.604-.55.334-1.17.577-1.816.703-.52-.568-1.265-.92-2.09-.92C9.077 1 7.8 2.307 7.8 3.912c0 .225.028.45.072.667C5.5 4.45 3.382 3.3 1.974 1.53c-.248.433-.39.928-.39 1.47 0 1.01.505 1.9 1.276 2.424-.47-.018-.912-.153-1.293-.37v.036c0 1.416.983 2.587 2.293 2.858-.24.063-.496.1-.752.1-.186 0-.363-.02-.54-.046.362 1.154 1.416 1.992 2.674 2.02-.983.783-2.214 1.243-3.55 1.243-.24 0-.462-.01-.692-.036 1.266.83 2.772 1.308 4.392 1.308 5.26 0 8.138-4.435 8.138-8.284 0-.126 0-.252-.008-.38.557-.413 1.045-.927 1.434-1.504z"
        fillRule="evenodd"
      />
    </svg>
  );
};

IconSocialMediaTwitter.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconSocialMediaTwitter.propTypes = { rootClassName: string, className: string };

export default IconSocialMediaTwitter;
