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
      <ul style={{ columns: 3 }}>
        {Object.keys(options).map(key => (
          <li className={css.horseInfoItem}>
            <p>icon</p>
            <div>
              <p className={css.horseInfoItemTitle}>
                <FormattedMessage id={`ListingPage.horseInfo.${key}`} />
              </p>
              <p className={css.horseInfoItemValue}>{options[key]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionHorseInfo;
