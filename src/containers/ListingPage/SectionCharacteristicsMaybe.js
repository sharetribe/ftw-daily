import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IconCheckmark } from '../../components';

import css from './ListingPage.css';

const SectionCharacteristicsMaybe = props => {
  const { characteristics } = props;
  return characteristics && characteristics.length ? (
    <div className={css.listingSectionContainer}>
      <h2 className={css.listingSectionTitle}>
        <FormattedMessage id="ListingPage.characteristicsTitle" />
      </h2>
      <ul className={css.threeColumns}>
        {characteristics.map(item => (
          <li key={item.toString()} className={css.listingItemContainer}>
            <IconCheckmark className={css.listingIcon} />
            <p className={css.listingPrimaryText}>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default SectionCharacteristicsMaybe;
