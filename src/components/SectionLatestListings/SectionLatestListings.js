import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage } from '../../util/reactIntl';
import { ListingCard, NamedLink } from '../../components';
import css from './SectionLatestListings.css';

const cardRenderSizes = '(min-width: 480px) 250px, 80vw'

const LatestListing = ({ listings }) => {
  return (
    <div>
      <div className={css.title}>
        <FormattedMessage id="SectionLatestListings.titleLineOne" />
      </div>
      <div className={css.subTitle}>
        <FormattedMessage id="SectionLatestListings.titleLineTwo" />
      </div>
      <div className={css.listingCards}>
        {listings.map(l => (
          <ListingCard className={css.listingCard} key={l.id.uuid} listing={l} renderSizes={cardRenderSizes} />
        ))}
      </div>
      <NamedLink
        name="SearchPage"
        to={{
          search:
            'address=Schweiz&bounds=47.808453%2C10.492064%2C45.817981%2C5.955902',
        }}
        className={css.bigButton}
      >
        <div>
          <FormattedMessage id="LandingPage.viewAllListingsButton" />
        </div> 
      </NamedLink>
    </div>
  );
};

export default LatestListing;
