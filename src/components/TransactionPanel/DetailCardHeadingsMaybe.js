import React from 'react';
import AddressLinkMaybe from './AddressLinkMaybe';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build detail card headings
const DetailCardHeadingsMaybe = props => {
  const {
    showDetailCardHeadings,
    listingTitle,
    subTitle,
    location,
    geolocation,
    showAddress,
  } = props;

  return showDetailCardHeadings ? (
    <div className={css.detailCardHeadings}>
      <h2 className={css.detailCardTitle}>{listingTitle}</h2>
      <p className={css.detailCardSubtitle}>{subTitle}</p>
      <AddressLinkMaybe location={location} geolocation={geolocation} showAddress={showAddress} />
    </div>
  ) : null;
};

export default DetailCardHeadingsMaybe;
