import React from 'react'
import classNames from 'classnames'
import { IconHelp } from '../../assets/IconHelp'
import { IconLightBulb } from '../../assets/IconLightBulb'

import css from './NotificationBanner.css'

export const NotificationBanner = (props) => {
  const { text, type } = props

  const determineIcon = () => {
    switch (type) {
      case 'idea':
        return <IconLightBulb className={css.icon}/>
        break
      case 'help':
        return <IconHelp className={classNames(css.icon, css.iconHelp)}/>
      default:
        return null
    }
  }

  const determineCSS = () => {
    switch (type) {
      case 'idea':
        return classNames(css.notificationBannerContainer, css.notificationBannerContainerIdea)
        break
      case 'help':
        return classNames(css.notificationBannerContainer, css.notificationBannerContainerHelp)
      default:
        return null
    }
  }

  return (
    <div className={determineCSS()}>
      {
        type
          ? <div className={css.iconContainer}>
            {determineIcon()}
          </div>
          : null
      }
      <div className={css.textContainer}>
        <small className={css.text}>
          {text}
        </small>
      </div>
    </div>
  )
}
