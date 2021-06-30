import React from 'react';
import { shape, number } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';

import css from './ListingPage.module.css';

const SectionSeats = props => {
  const { publicData } = props;
  const seats = 'seats' in publicData ? publicData.seats : 1;
  // const seats = publicData.seats;

  return seats ? (
    <div className={css.sectionQuantity}>
      <h2 className={css.quantityTitle}>
        <FormattedMessage id="ListingPage.seatsTitle" />
      </h2>
      <p className={css.quantity}>{seats}</p>
    </div>
  ) : null;
};

SectionSeats.propTypes = {
  publicData: shape({
    seats: number,
  }).isRequired,
};

export default SectionSeats;
