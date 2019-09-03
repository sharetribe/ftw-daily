import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IconCheckmark } from '../../components';

import css from './ListingPage.css';

const SectionDisciplinesMaybe = props => {
  const { disciplines } = props;
  return disciplines && disciplines.length ? (
    <div className={css.listingSectionContainer}>
      <h2 className={css.listingSectionTitle}>
        <FormattedMessage id="ListingPage.disciplinesTitle" />
      </h2>
      <ul className={css.threeColumns}>
        {disciplines.map(item => (
          <li key={item.toString()} className={css.listingItemContainer}>
            <IconCheckmark size="small" className={css.listingIcon} />
            <p className={css.listingPrimaryText}>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default SectionDisciplinesMaybe;
