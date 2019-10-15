import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import { ListingCard } from '../../components';
import css from './SectionLatestListings.css';

const LatestListing = ({ listings }) => {
  return (
    <>
      <div className={css.title}>
        <FormattedMessage id="SectionLatestListings.titleLineOne" />
      </div>
      <div className={css.listingCards}>
        {listings.map(l => (
          <ListingCard
            className={css.listingCard}
            key={l.id.uuid}
            listing={l}
            // renderSizes={cardRenderSizes}
            // setActiveListing={setActiveListing}
          />
        ))}
      </div>
    </>
  );
};

export default LatestListing;
