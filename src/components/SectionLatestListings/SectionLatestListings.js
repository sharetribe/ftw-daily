import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage } from '../../util/reactIntl';
import { ListingCard, NamedLink } from '../../components';
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
      <NamedLink
        name="SearchPage"
        to={{
          search:
            'address=Switzerland&bounds=47.808453%2C10.492064%2C45.817981%2C5.955902',
        }}
        className={css.bigButton}
      >
        <FormattedMessage id="SectionHero.viewAllListingsButton" />
      </NamedLink>
    </>
  );
};

export default LatestListing;
