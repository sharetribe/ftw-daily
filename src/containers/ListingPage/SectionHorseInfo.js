import React from 'react';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionHorseInfo = props => {
  const { options } = props;
  return (
    <div className={css.sectionHorseSectionHorseInfo}>
      <h2 className={css.horseInfoTitle}>
        <FormattedMessage id="ListingPage.horseInfoTitle" />
      </h2>
      <div>
        {Object.keys(options).map(key => (
          <div>
            <span>{key}</span>
            <span>{options[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHorseInfo;
