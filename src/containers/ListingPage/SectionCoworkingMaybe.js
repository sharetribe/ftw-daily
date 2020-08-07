import React from 'react'
import includes from 'lodash/includes'
import keys from 'lodash/keys'
import SingleLineGridList from '../../components/SingleRowImageGridList/SingleRowImageGridList'
import { FormattedMessage } from '../../util/reactIntl'
import { richText } from '../../util/richText'

import css from './ListingPage.css'

const MIN_LENGTH_FOR_LONG_WORDS_IN_COMMUNITY = 20

const SectionCoworkingMaybe = (props) => {
  const { publicData, images } = props

  const generateMobileImageGrid = () => {
    if (publicData.coworking) {
      const coworkingImageKeys = keys(publicData.coworking.images)
      const imagesToShow = (images || [])
      .filter((img) => includes(coworkingImageKeys, img.id.uuid))
      .map((nimg) => ({ img: nimg.attributes.variants['landscape-crop2x'].url, title: 'Coworking Image' }))
      console.log(imagesToShow)
      return (
        <SingleLineGridList
          images={imagesToShow}
        />
      )
    }
  }

  return publicData && (publicData.vibe || publicData.coworking) ? (
    <div className={css.sectionCommunity}>
      <h2>
        <span className={css.coSectionTitle}>
          <FormattedMessage id="ListingPage.coworkingTitle" />
        </span>
      </h2>
      <p className={css.community}>
        {
          publicData.coworking ? publicData.coworking.description
            : publicData.vibe
        }
      </p>
      {generateMobileImageGrid()}
    </div>
  ) : null
}

export default SectionCoworkingMaybe
