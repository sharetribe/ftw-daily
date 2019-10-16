import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage } from '../../util/reactIntl';
import { ListingCard } from '../../components';
import css from './SectionLatestListings.css';

const LatestListing = ({ listings }) => {
  const listignsInfoForLandingPage = listings.map(i =>
    _.omit(i, 'attributes.publicData.gender', 'attributes.publicData.breed')
  );

  return (
    <>
      <div className={css.title}>
        <FormattedMessage id="SectionLatestListings.titleLineOne" />
      </div>
      <div className={css.listingCards}>
        {listignsInfoForLandingPage.map(l => (
          <ListingCard className={css.listingCard} key={l.id.uuid} listing={l} />
        ))}
      </div>
    </>
  );
};

export default LatestListing;
