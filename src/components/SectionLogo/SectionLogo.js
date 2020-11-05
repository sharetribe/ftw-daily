import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import logo from './images/hotpatch-logo.png';

import css from './SectionLogo.css';

const SectionLogo = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  const titleText = <FormattedMessage id="SectionLogo.title" />;

  return (
    <div className={classes}>
      <div className={css.container}>
        <div className={css.imageContainer}>
          <img src={logo} alt={titleText} className={css.mainImage}/>
        </div>
        <div className={css.title}>
          {titleText}
        </div>
        {/* <div className={css.descriptionDiv} >
        </div> */}
        {/* <div className={css.imageContainer}>
          <div className={css.imageWrapper}>
            <div className={css.aspectWrapper}>
              <LazyImage src={friendsWorking} alt={"What is Hotpatch"} className={css.mainImage} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

SectionLogo.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLogo.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLogo;
