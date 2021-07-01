import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { InlineTextButton } from '../../components';
// import { LINE_ITEM_UNITS, LINE_ITEM_DAY } from '../../util/types';

import css from './ListingPage.module.css';

const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    richTitle,
    category,
    hostLink,
    showContactUser,
    onContactUser,
    listing,
    // unitType,
    priceType
  } = props;

  const unitTranslationKey = `ListingPage.${priceType}`;

  // const isHourly = unitType === LINE_ITEM_UNITS;
  // const isDaily = unitType === LINE_ITEM_DAY;

  // const unitTranslationKey = isHourly
  //   ? 'ListingPage.perHour'
  //   : isDaily
  //   ? 'ListingPage.perDay'
  //   : 'ListingPage.perUnit';

  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
        <div className={css.desktopPriceValue} title={priceTitle}>
          {formattedPrice}
        </div>
        <div className={css.desktopPerUnit}>
          <FormattedMessage id={unitTranslationKey} />
        </div>
      </div>
      <div className={css.heading}>
        <h1 className={css.title}>{richTitle}</h1>
        <div className={css.author}>
          {category}
          <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }} />
          {showContactUser ? (
            <span className={css.contactWrapper}>
              <span className={css.separator}>•</span>
              <InlineTextButton
                rootClassName={css.contactLink}
                onClick={onContactUser}
                enforcePagePreloadFor="SignupPage"
              >
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
