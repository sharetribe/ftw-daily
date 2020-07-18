import React from 'react'
import Embed from 'react-embed'
import Button from '../../components/Button/Button'
import Modal from '../../components/Modal/Modal'
import { FormattedMessage } from '../../util/reactIntl'
import { richText } from '../../util/richText'

import css from './ListingPage.css'

const MIN_LENGTH_FOR_LONG_WORDS_IN_SURF = 20

const onManageDisableScrolling = (componentId, scrollingDisabled = true) => {
  // We are just checking the value for now
  console.log('Toggling Modal - scrollingDisabled currently:', componentId, scrollingDisabled)
}

const SectionSurfMaybe = (props) => {
  const [shouldOpenForecast, toggleForecast] = React.useState(false)
  const { publicData } = props

  return publicData && publicData.surf ? (
    <div className={css.sectionSurf}>
      <h2 className={css.surfTitle}>
        <FormattedMessage id="ListingPage.surfTitle" />
      </h2>
      <p className={css.surf}>
        {richText(publicData.surf, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_SURF,
          longWordClass: css.longWord,
        })}
      </p>
      <Button className={css.submit} onClick={() => toggleForecast(!shouldOpenForecast)}>
        Submit
      </Button>
      <Modal
        isOpen={shouldOpenForecast}
        onClose={() => toggleForecast(!shouldOpenForecast)}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <iframe src="https://magicseaweed.com/Surf-Beach-Surf-Report/3702/Embed/" width="320"
          height="600" frameBorder="0"></iframe>
      </Modal>
    </div>
  ) : null
}

export default SectionSurfMaybe
