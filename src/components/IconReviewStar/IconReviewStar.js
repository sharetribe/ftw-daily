import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconReviewStar.module.css';

const IconReviewStar = props => {
  const { className, rootClassName, isFilled, isHalfFilled } = props;
  const filledOrDefault = isFilled ? css.filled : css.root;
  const classes = classNames(rootClassName || filledOrDefault, className);
  if (isHalfFilled) {
    return (
      <svg className={css.isHalfFilled}fill="#ffcc00ef" width="14px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"><path d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z M15.8,13.6c-0.2,0.2-0.3,0.6-0.3,0.9l0.7,4.2l-3.8-2c-0.1-0.1-0.3-0.1-0.5-0.1V5.7l1.9,3.8c0.1,0.3,0.4,0.5,0.8,0.5l4.2,0.6L15.8,13.6z" /></svg>
    );
  }
  return (
    <svg
      className={classes}
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9998 19.8198L18.879 23.3757C19.9556 24.0273 21.2731 23.064 20.9898 21.8457L19.4315 15.159L24.6306 10.654C25.5798 9.83233 25.0698 8.274 23.8231 8.17483L16.9806 7.594L14.3031 1.27566C13.8215 0.128164 12.1781 0.128164 11.6965 1.27566L9.01896 7.57983L2.17646 8.16066C0.929798 8.25983 0.419798 9.81816 1.36896 10.6398L6.56813 15.1448L5.0098 21.8315C4.72646 23.0498 6.04396 24.0132 7.12063 23.3615L12.9998 19.8198Z"
        fill="evenodd"
      />
    </svg>
  );
};

IconReviewStar.defaultProps = { className: null, rootClassName: null, isFilled: false };

const { bool, string } = PropTypes;

IconReviewStar.propTypes = {
  className: string,
  rootClassName: string,
  isFilled: bool,
};

export default IconReviewStar;
