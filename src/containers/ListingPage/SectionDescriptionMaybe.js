import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { richText } from '../../util/richText';
import ToggleText from '../../components/ToggleText/ToggleText';
import css from './ListingPage.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION = 20;

const SectionDescriptionMaybe = props => {
  const { description } = props;

  return description ? (
    <div className={css.listingSectionContainer}>
      <h2 className={css.listingSectionTitle}>
        <FormattedMessage id="ListingPage.descriptionTitle" />
      </h2>
          <ToggleText CustomTag="p" className={css.listingPrimaryText} maxLength={250} customChildren>
                  {richText(description, {
                      longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION,
                      longWordClass: css.longWord,
                  })}
           </ToggleText>
    </div>
  ) : null;
};

export default SectionDescriptionMaybe;
