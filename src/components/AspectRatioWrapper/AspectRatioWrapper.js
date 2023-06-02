import React from 'react';
import { node, number, string } from 'prop-types';
import classNames from 'classnames';

import css from './AspectRatioWrapper.module.css';

const AspectRatioWrapper = props => {
  const { children, className, rootClassName, width, height, ...rest } = props;
  const classes = classNames(rootClassName || css.root, className);

  const aspectRatio = (height / width) * 100;
  const paddingBottom = `${aspectRatio}%`;

  return (
    <div className={classes} {...rest}>
      <div className={css.aspectPadding} style={{ paddingBottom }}>
        <div className={css.aspectBox}>{children}</div>
      </div>
    </div>
  );
};

AspectRatioWrapper.defaultProps = {
  className: null,
  rootClassName: null,
  children: null,
};

AspectRatioWrapper.propTypes = {
  className: string,
  rootClassName: string,
  width: number.isRequired,
  height: number.isRequired,
  children: node,
};

export default AspectRatioWrapper;
