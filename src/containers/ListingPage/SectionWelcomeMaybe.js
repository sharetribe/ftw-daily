import React from 'react'

import css from './ListingPage.css'

const SectionWelcomeMaybe = (props) => {
  const { publicData } = props

  return publicData && publicData.welcomeMessage ? (
    <div className={css.welcomeMessageContainer}>
      <h3 className={css.welcomeMessage}>{`"${publicData.welcomeMessage}"`}</h3>
      {
        publicData.welcomeMessageSigner
          ?
          <div className={css.messageSignerContainer}>
            <span className={css.welcomeMessageSigner}>{`- ${publicData.welcomeMessageSigner}`}</span>
          </div>
          : null
      }
    </div>
  ) : null
}

export default SectionWelcomeMaybe
