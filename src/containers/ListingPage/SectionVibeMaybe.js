import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { richText } from '../../util/richText';

import css from './ListingPage.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_VIBE = 20;

const SectionVibeMaybe = props => {
  const { publicData } = props;

  return publicData && publicData.vibe ? (
    <div className={css.sectionVibe}>
      <h2 className={css.vibeTitle}>
        <FormattedMessage id="ListingPage.vibeTitle" />
      </h2>
      <p className={css.vibe}>
        {richText(publicData.vibe, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_VIBE,
          longWordClass: css.longWord,
        })}
      </p>
    </div>
  ) : null;
};

export default SectionVibeMaybe;