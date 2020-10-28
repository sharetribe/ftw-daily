import React from 'react';
import classNames from 'classnames';
import { AvatarMedium, ResponsiveImage } from '../../components';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build AddressLinkMaybe
const DetailCardImage = props => {
  const {
    className,
    rootClassName,
    avatarWrapperClassName,
    listingTitle,
    image,
    provider,
    isCustomer,
  } = props;
  const classes = classNames(rootClassName || css.detailCardImageWrapper, className);
  return (
    <React.Fragment>
      <div className={classes}>
        <div className={css.aspectWrapper}>
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={listingTitle}
            image={image}
            variants={['landscape-crop', 'landscape-crop2x']}
          />
        </div>
      </div>
      {isCustomer ? (
        <div className={avatarWrapperClassName || css.avatarWrapper}>
          <AvatarMedium user={provider} />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default DetailCardImage;
