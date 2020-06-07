import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'

import css from './SectionHowItWorks.css'
import nashvilleForHireText from '../../assets/images/nashvilleForHireText.png'

const Image = styled.img`
  max-width: 100%;
`

const Info = styled.p`
  text-align: center;
  margin-bottom: 3em;
`

const SectionHowItWorks = (props) => {
  const { rootClassName, className } = props

  const classes = classNames(rootClassName || css.root, className)
  return (
    <div className={classes}>
      <Image src={nashvilleForHireText} alt="Nashville For Hire" />

      <Info>
        Make <strong>your next recording project&nbsp;your best yet</strong> by hiring Nashville's
        top&nbsp;music professionals remotely.
      </Info>

      <div className={css.responsiveVideo}>
        <iframe
          src="https://player.vimeo.com/video/272277122"
          width="640"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  )
}

SectionHowItWorks.defaultProps = { rootClassName: null, className: null }

const { string } = PropTypes

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
}

export default SectionHowItWorks
