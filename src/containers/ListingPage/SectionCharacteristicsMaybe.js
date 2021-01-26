import React from 'react';
import { FormattedMessage } from 'react-intl';
import ToggleProperties from '../../components/ToggleProperties/ToggleProperties'
import config from '../../config';

import css from './ListingPage.css';

const SectionCharacteristicsMaybe = props => {
  const { characteristics, options } = props;

  return characteristics && characteristics.length ? (
    <div className={css.listingSectionContainer}>
      <h2 className={css.listingSectionTitle}>
        <FormattedMessage id="ListingPage.characteristicsTitle" />
      </h2>
      <ToggleProperties
        id="ListingPage.characteristics"
        options={options}
        selectedOptions={characteristics}
        threeColumns={true}
      />
    </div>
  ) : null;
};

SectionCharacteristicsMaybe.defaultProps = {
  options: config.custom.characteristics,
};

export default SectionCharacteristicsMaybe;
