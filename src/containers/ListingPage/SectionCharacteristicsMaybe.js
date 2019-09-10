import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IconCheckmark } from '../../components';
import config from '../../config';

import css from './ListingPage.css';

const SectionCharacteristicsMaybe = props => {
  const { characteristics, options } = props;

  return characteristics && characteristics.length ? (
    <div className={css.listingSectionContainer}>
      <h2 className={css.listingSectionTitle}>
        <FormattedMessage id="ListingPage.characteristicsTitle" />
      </h2>
      <ul className={css.threeColumns}>
        {characteristics.map(item => (
          <li key={item.toString()} className={css.listingItemContainer}>
            <IconCheckmark size="small" className={css.listingIcon} />
            <p className={css.listingPrimaryText}>
              {options.find(value => value.key === item).label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

SectionCharacteristicsMaybe.defaultProps = {
  options: config.custom.characteristics,
};

export default SectionCharacteristicsMaybe;
