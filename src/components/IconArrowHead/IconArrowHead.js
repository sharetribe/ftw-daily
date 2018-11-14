import React from 'react';
import { oneOf, string } from 'prop-types';
import classNames from 'classnames';

import css from './IconArrowHead.css';

const DIRECTION_RIGHT = 'right';
const DIRECTION_LEFT = 'left';
const SIZE_BIG = 'big';
const SIZE_SMALL = 'small';

const IconArrowHead = props => {
  const { className, rootClassName, direction, size } = props;
  const classes = classNames(rootClassName || css.root, className);

  const isRight = direction === DIRECTION_RIGHT;
  const isLeft = direction === DIRECTION_LEFT;
  const isBig = size === SIZE_BIG;
  const isSmall = size === SIZE_SMALL;

  if (isRight && isSmall) {
    return (
      <svg
        className={classes}
        width="9"
        height="13"
        viewBox="0 0 9 13"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.472 6.97c.26-.26.26-.68 0-.94L2.14.694c-.263-.26-.684-.26-.944 0-.26.26-.26.683 0 .943L6.056 6.5l-4.86 4.862c-.26.26-.26.683 0 .943.26.26.68.26.943 0L7.47 6.97z"
          fillRule="evenodd"
        />
      </svg>
    );
  } else if (isLeft && isSmall) {
    return (
      <svg
        className={classes}
        width="9"
        height="13"
        viewBox="0 0 9 13"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.195 6.03c-.26.26-.26.68 0 .94l5.333 5.335c.262.26.683.26.943 0 .262-.26.262-.683 0-.943L2.61 6.5l4.86-4.862c.262-.26.262-.683 0-.943-.26-.26-.68-.26-.942 0L1.195 6.03z"
          fillRule="evenodd"
        />
      </svg>
    );
  } else if (isRight && isBig) {
    return (
      <svg
        className={classes}
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
  } else if (isLeft && isBig) {
    return (
      <svg
        className={classes}
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
  }
};

IconArrowHead.defaultProps = {
  className: null,
  rootClassName: null,
  size: SIZE_SMALL,
};

IconArrowHead.propTypes = {
  className: string,
  rootClassName: string,
  direction: oneOf([DIRECTION_RIGHT, DIRECTION_LEFT]).isRequired,
  size: oneOf([SIZE_BIG, SIZE_SMALL]),
};

export default IconArrowHead;
