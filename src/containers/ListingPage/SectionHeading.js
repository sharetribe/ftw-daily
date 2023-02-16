import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { InlineTextButton } from '../../components';
// import { LINE_ITEM_UNITS, LINE_ITEM_DAY } from '../../util/types';

import css from './ListingPage.module.css';

const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    title,
    id,
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

  //const patch = JSON.stringify(richTitle);
  
  //var data = {subject: JSON.stringify(richTitle)};

  //var params = jQuery.param(data);

  //var patch = 'https://share.hsforms.com/1Zq6xDjz7RCG8gjdC1vBbgA57edm?' + params;

  //console.log('params', JSON.stringify(params));

  var data = title
  var patchId = id

  var url = "https://share.hsforms.com/1Zq6xDjz7RCG8gjdC1vBbgA57edm?patch_name=" + encodeURIComponent(JSON.stringify(data)) + "&patch_url=https://www.hotpatch.com/l/" + encodeURIComponent(patchId);

  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
      <p className={css.desktopPerUnit}>from</p>
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
              <a
                ClassName={css.contactLink} target = "_blank"
                href={url}
               // enforcePagePreloadFor="SignupPage"
              >
                <FormattedMessage id="ListingPage.contactUser" />
              </a>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
