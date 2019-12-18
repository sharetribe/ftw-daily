import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { richText } from '../../util/richText';

import css from './ListingPage.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_COMMUNITY = 20;

const SectionCommunityMaybe = props => {
  const { publicData } = props;

  return publicData && publicData.community ? (
    <div className={css.sectionCommunity}>
      <h2 className={css.communityTitle}>
        <FormattedMessage id="ListingPage.communityTitle" />
      </h2>
      <p className={css.community}>
        {richText(publicData.community, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_COMMUNITY,
          longWordClass: css.longWord,
        })}
      </p>
    </div>
  ) : null;
};

export default SectionCommunityMaybe;