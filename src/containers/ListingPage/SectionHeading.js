import React from 'react';
import { FormattedMessage } from 'react-intl';
import { InlineTextButton } from '../../components';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, LINE_ITEM_HOUR, LINE_ITEM_WEEK } from '../../util/types';
import config from '../../config';

import css from './ListingPage.css';

const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    richTitle,
    category,
    hostLink,
    idVerify,
    showContactUser,
    onContactUser,
    user_type,
    rate,
  } = props;

  const unitType = rate;

  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const isHourly = unitType === LINE_ITEM_HOUR;
  const isWeekly = unitType === LINE_ITEM_WEEK;

  const unitTranslationKey = isHourly
    ? 'ListingPage.perHour'
    : isNightly
    ? 'ListingPage.perNight'
    : isDaily
    ? 'ListingPage.perDay'
    : isWeekly
    ? 'ListingPage.perWeek'
    : 'ListingPage.perUnit';

  console.log('price', formattedPrice, unitTranslationKey);
  return (
    <div className={css.sectionHeading}>
      {user_type != 0 && user_type != 2 ? (
        <div className={css.desktopPriceContainer}>
          <div className={css.desktopPriceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.desktopPerUnit}>
            <FormattedMessage id={unitTranslationKey} />
          </div>
        </div>
      ) : null}
      <div className={css.heading}>
        <h1 className={css.title}>{richTitle}</h1>
        <div className={css.author}>
          {category}
          <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }} />
          {idVerify}
          {showContactUser ? (
            <span className={css.contactWrapper}>
              <span className={css.separator}>•</span>
              <InlineTextButton rootClassName={css.contactLink} onClick={onContactUser}>
                <FormattedMessage id="ListingPage.contactUser" />
              </InlineTextButton>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
