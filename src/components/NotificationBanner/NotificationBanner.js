import React from 'react'
import { IconLightBulb } from '../../assets/IconLightBulb'

import css from './NotificationBanner.css'

export const NotificationBanner = (props) => {
  return (
    <div className={css.notificationBannerContainer} style={{ backgroundColor: '#d9f9ff', alignItems: 'center' }}>
      <div className={css.iconContainer}>
        <IconLightBulb className={css.icon}/>
      </div>
      <div className={css.textContainer}>
        <small className={css.text}>
          A simple walkthrough video from your phone can create more trust and increase bookings by up to 317%! You can easily record it right from the Youtube app.
        </small>
      </div>
    </div>
  )
}
