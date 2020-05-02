import React from 'react';
import { FormattedMessage } from 'react-intl';
import { richText } from '../../util/richText';

import css from './ListingPage.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION = 20; 

const SectionDescriptionMaybe = props => {
  const { description, user_type } = props;
  const user_name = user_type === 2? "Service" : user_type === 1 ? "Sitter" : "Owner";
  return description ? (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="ListingPage.descriptionTitle" values={{user_name}} />
      </h2>
      <p className={css.description}>
        {richText(description, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION,
          longWordClass: css.longWord,
        })}
      </p>
    </div>
  ) : null;
};

export default SectionDescriptionMaybe;
