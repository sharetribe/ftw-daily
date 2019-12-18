import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { richText } from '../../util/richText';

import css from './ListingPage.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_RETREAT = 20;

const SectionRetreatMaybe = props => {
  const { publicData } = props;

  return publicData && publicData.retreat && publicData.retreat.description ? (
    <div className={css.sectionRetreat}>
      <h2 className={css.retreatTitle}>
        <FormattedMessage id="ListingPage.retreatTitle" />
      </h2>
      <p className={css.retreat}>
        {richText(publicData.retreat.description, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_RETREAT,
          longWordClass: css.longWord,
        })}
      </p>
    </div>
  ) : null;
};

export default SectionRetreatMaybe;