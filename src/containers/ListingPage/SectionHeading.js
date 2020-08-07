import React from 'react'
import { FormattedMessage } from '../../util/reactIntl'
import { Button } from '../../components'
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types'
import config from '../../config'

import css from './ListingPage.css'

const SectionHeading = (props) => {
  const {
    priceTitle,
    formattedPrice,
    richTitle,
    category,
    hostLink,
    showContactUser,
    onContactUser,
    retreat,
    wifi
  } = props

  const unitType = config.bookingUnitType
  const isNightly = unitType === LINE_ITEM_NIGHT
  const isDaily = unitType === LINE_ITEM_DAY

  const unitTranslationKey = isNightly
    ? 'ListingPage.perNight'
    : isDaily
      ? 'ListingPage.perDay'
      : 'ListingPage.perUnit'

  return (
    <div className={css.sectionHeading}>
      <div className={css.headingContainer}>
        <div className={css.heading}>
          <div className={css.author}>
            {category}
            <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }} />
          </div>
          {showContactUser ? (
            <span className={css.contactWrapper}>
              <Button className={css.contactHost} onClick={onContactUser}>
                <FormattedMessage id="ListingPage.contactUser" />
              </Button>
            </span>
          ) : null}
        </div>
        <div className={css.desktopPriceContainer}>
          <div className={css.desktopPriceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.desktopPerUnit}>
            <FormattedMessage id={unitTranslationKey} />
          </div>
        </div>
      </div>
      <div className={css.tags}>
        {wifi}
        {retreat}
      </div>
    </div>
  )
}

export default SectionHeading
