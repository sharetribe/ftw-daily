import React from 'react';
import { FormattedMessage } from 'react-intl';
import ToggleProperties from '../../components/ToggleProperties/ToggleProperties'
import config from '../../config';

import css from './ListingPage.css';

const SectionDisciplinesMaybe = props => {
  const { disciplines, options } = props;

  return disciplines && disciplines.length ? (
    <div className={css.listingSectionContainer}>
      <h2 className={css.listingSectionTitle}>
        <FormattedMessage id="ListingPage.disciplinesTitle" />
      </h2>
      <ToggleProperties
        id="ListingPage.disciplines"
        options={options}
        selectedOptions={disciplines}
        threeColumns={true}
      />

    </div>
  ) : null;
};

SectionDisciplinesMaybe.defaultProps = {
  options: config.custom.disciplines,
};

export default SectionDisciplinesMaybe;
