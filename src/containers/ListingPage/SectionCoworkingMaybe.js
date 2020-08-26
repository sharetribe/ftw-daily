import React from 'react'
import includes from 'lodash/includes'
import keys from 'lodash/keys'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MultiRowGridList from '../../components/MultiRowGridList/MultiRowGridList'
import SingleLineGridList from '../../components/SingleRowImageGridList/SingleRowImageGridList'
import { FormattedMessage } from '../../util/reactIntl'
import { richText } from '../../util/richText';

import css from './ListingPage.css'

const MIN_LENGTH_FOR_LONG_WORDS_IN_COMMUNITY = 20

const SectionCoworkingMaybe = (props) => {
  const { publicData, images, wifi } = props

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const generateMobileImageGrid = () => {
    if (publicData.coworking) {
      const coworkingImageKeys = keys(publicData.coworking.images)
      const imagesToShow = (images || [])
      .filter((img) => includes(coworkingImageKeys, img.id.uuid))
      .map((nimg) => ({ img: nimg.attributes.variants['landscape-crop2x'].url, title: 'Coworking Image' }))
      return (
        isMobile
          ? <SingleLineGridList
            images={imagesToShow}
          />
          : <MultiRowGridList images={imagesToShow}/>
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
      <div className={css.tags}>
        {wifi}
      </div>
      <p className={css.description}>
        {richText(publicData.coworking ? publicData.coworking.description : publicData.vibe, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_COMMUNITY,
          longWordClass: css.longWord,
        })}
      </p>
      {generateMobileImageGrid()}
    </div>
  ) : null
}

export default SectionCoworkingMaybe
