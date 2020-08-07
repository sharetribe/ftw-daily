import React from 'react'
import includes from 'lodash/includes'
import keys from 'lodash/keys'
import SingleLineGridList from '../../components/SingleRowImageGridList/SingleRowImageGridList'
import { FormattedMessage } from '../../util/reactIntl'
import { richText } from '../../util/richText'

import css from './ListingPage.css'

const MIN_LENGTH_FOR_LONG_WORDS_IN_COMMUNITY = 20

const SectionColivingMaybe = (props) => {
  const { publicData, images } = props

  const generateMobileImageGrid = () => {
    if (publicData.coliving) {
      const colivingImageKeys = keys(publicData.coliving.images)
      const imagesToShow = (images || [])
      .filter((img) => includes(colivingImageKeys, img.id.uuid))
      .map((nimg) => ({ img: nimg.attributes.variants['landscape-crop2x'].url, title: 'Coliving Image' }))
      console.log(imagesToShow)
      return (
        <SingleLineGridList
          className={css.coImageGridList}
          images={imagesToShow}
        />
      )
    }
  }

  return publicData && (publicData.vibe || publicData.coliving) ? (
    <div className={css.sectionCommunity}>
      <h2>
        <span className={css.coSectionTitle}>
          <FormattedMessage id="ListingPage.colivingTitle" />
        </span>
      </h2>
      <p className={css.community}>
        {
          publicData.coliving ? publicData.coliving.description
            : publicData.vibe
        }
      </p>
      {generateMobileImageGrid()}
    </div>
  ) : null
}

export default SectionColivingMaybe
