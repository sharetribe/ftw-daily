import React from 'react'
import styled from 'styled-components'
import nashvilleForHireText from '../../../assets/images/nashvilleForHireText.png'
import { LandingHero } from '../molecules'

const Image = styled.img`
  max-width: 100%;
  margin-top: 2rem;
`

const Info = styled.p`
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
`

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  max-width: 100%;
  margin: 0;
  overflow: hidden;
  border-radius: 4px;
`

export const Landing: React.FC = () => {
  return (
    <div>
      <div>
        <LandingHero />

        <Image src={nashvilleForHireText} alt="Nashville For Hire" />

        <Info>
          Make <strong>your next recording project&nbsp;your best yet</strong> by hiring Nashville's
          top&nbsp;music professionals remotely.
        </Info>

        <VideoWrapper>
          <iframe
            title="Nashville For Hire Video"
            src="https://player.vimeo.com/video/272277122"
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </VideoWrapper>
      </div>
    </div>
  )
}
