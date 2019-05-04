import React from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { InlineTextButton } from '../../components';
import SectionAvatar from './SectionAvatar';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import config from '../../config';

import css from './ListingPage.css';

const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    completePrice,
    richTitle,
    category,
    traderCategory,
    hostLink,
    showContactUser,
    onContactUser,
    user,
    params
  } = props;

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  
  const unitTranslationKey = isNightly
  ? 'ListingPage.perNight'
  : isDaily
  ? 'ListingPage.perDay'
  : 'ListingPage.perUnit';
  
  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
        <SectionAvatar user={user} params={params} />
      </div>
      <div className={css.heading}>
        <h1 className={css.title}>{richTitle}</h1>
        <div className={css.author}>
          <FormattedMessage id={completePrice} />
          <span className={css.separator}>•</span>
          {category}
          <span className={css.separator}>•</span>
          {traderCategory}
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
