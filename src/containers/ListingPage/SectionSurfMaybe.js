import React from 'react'
import _ from 'lodash'
import includes from 'lodash/includes'
import keys from 'lodash/keys'
import { WaveDivider } from '../../assets/WaveDivider'
import Modal from '../../components/Modal/Modal'
import SingleLineGridList from '../../components/SingleRowImageGridList/SingleRowImageGridList';
import { FormattedMessage } from '../../util/reactIntl'
import { richText } from '../../util/richText'

import css from './ListingPage.css'

const MIN_LENGTH_FOR_LONG_WORDS_IN_SURF = 20

const onManageDisableScrolling = (componentId, scrollingDisabled = true) => {
  // We are just checking the value for now
  console.log('Toggling Modal - scrollingDisabled currently:', componentId, scrollingDisabled)
}

const SectionSurfMaybe = (props) => {
  const [forecast, toggleForecast] = React.useState(null)
  const [isForecastLoading, toggleForecastIsLoading] = React.useState(false)
  const { publicData, metadata, images } = props

  const generateMobileImageGrid = () => {
    if (publicData.surfing) {
      const surfingImageKeys = keys(publicData.surfing.images)
      const imagesToShow = (images || [])
      .filter((img) => includes(surfingImageKeys, img.id.uuid))
      .map((nimg) => ({ img: nimg.attributes.variants['landscape-crop2x'].url, title: 'Surfing Image' }))
      return (
        <SingleLineGridList
          images={imagesToShow}
        />
      )
    }
  }

  const loadForecast = (url) => {
    toggleForecast(url)
    toggleForecastIsLoading(true)
  }

  const returnMSWButtons = () => {
    const surfSpots = _.get(metadata, 'surf.spots', [])
    const btns = surfSpots.map((ss) => {
      return (
        <div className={css.waveBtnContainer} onClick={() => loadForecast(ss.msw_embed_url)}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
            {ss.name}
            <div className={css.surfDifficultyIndicatorContainer}>
              {
                _.fill(Array(ss.max_skill), 0).map(() => (<div className={css.surfDifficultyIndicator} />))
              }
            </div>
          </div>
          <div className={css.orderIconContainer}>
            <span className={css.orderIconNumber}>{ss.order}</span>
          </div>
        </div>
      )
    })
    return (
      <div>
        {btns}
      </div>
    )
  }

  return publicData && (publicData.surf || publicData.surfing) ? (
    <div className={css.sectionSurf}>
      <h2>
        <span className={css.coSectionTitle}>
          <FormattedMessage id="ListingPage.surfTitle" />
        </span>
      </h2>
      <p className={css.community}>
        {
          publicData.surfing ? publicData.surfing.description
            : publicData.surf
        }
      </p>
      <div className={css.waveIconDividerContainer}>
        <WaveDivider />
      </div>
      { generateMobileImageGrid() }
      { returnMSWButtons() }
      <Modal
        isOpen={forecast !== null}
        onClose={() => toggleForecast(null)}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        {
          forecast
            ? <div className={css.forecastIFrameContainer}>
              <iframe
                src={forecast}
                className={css.forecastIFrame}
                frameBorder="0"
                onLoad={() => toggleForecastIsLoading(false)}
              />
            </div>
            : null
        }
      </Modal>
    </div>
  ) : null
}

export default SectionSurfMaybe
