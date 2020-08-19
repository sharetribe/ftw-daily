import React from 'react'
import includes from 'lodash/includes'
import keys from 'lodash/keys'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MultiRowGridList from '../../components/MultiRowGridList/MultiRowGridList'
import SingleLineGridList from '../../components/SingleRowImageGridList/SingleRowImageGridList'
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { FormattedMessage } from '../../util/reactIntl'

import css from './ListingPage.css'

const MIN_LENGTH_FOR_LONG_WORDS_IN_COMMUNITY = 20

const SectionColivingMaybe = (props) => {
  const { publicData, images, retreat } = props

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const generateMobileImageGrid = () => {
    if (publicData.coliving) {
      const colivingImageKeys = keys(publicData.coliving.images)
      const imagesToShow = (images || [])
      .filter((img) => includes(colivingImageKeys, img.id.uuid))
      .map((nimg) => ({ img: nimg.attributes.variants['landscape-crop2x'].url, title: 'Coliving Image' }))
      return (
        isMobile
          ? <SingleLineGridList
            images={imagesToShow}
          />
          : <MultiRowGridList images={imagesToShow}/>
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
      <div className={css.tags}>
        {retreat}
      </div>
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
