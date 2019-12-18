import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { richText } from '../../util/richText';

import css from './ListingPage.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_SURF = 20;

const SectionSurfMaybe = props => {
  const { publicData } = props;

  return publicData && publicData.surf ? (
    <div className={css.sectionSurf}>
      <h2 className={css.surfTitle}>
        <FormattedMessage id="ListingPage.surfTitle" />
      </h2>
      <p className={css.surf}>
        {richText(publicData.surf, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_SURF,
          longWordClass: css.longWord,
        })}
      </p>
    </div>
  ) : null;
};

export default SectionSurfMaybe;