import React from 'react'
import styled from 'styled-components'
import nashvilleForHireText from '../../../assets/images/nashvilleForHireText.png'
import { FeatureCard, LandingHero } from '../molecules'
import { Constrainer } from '../layout'

const Image = styled.img`
  display: block;
  width: 570px;
  max-width: 100%;
  margin: 2rem auto 0;
`

const Info = styled.p`
  max-width: 680px;
  margin: 0 auto 3rem;
  text-align: center;
  padding: 0 1rem;
`

const VideoWrapper = styled.div`
  max-width: 680px;
  margin: 0 auto 3rem;
`

const ResponsiveVideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  max-width: 100%;
  margin: 0;
  overflow: hidden;
  border-radius: 4px;
`

const FeatureCardContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 2rem;
`

export const Landing: React.FC = () => {
  return (
    <div>
      <div>
        <LandingHero />

        <Constrainer>
          <Image src={nashvilleForHireText} alt="Nashville For Hire" />

          <Info>
            Make <strong>your next recording project&nbsp;your best yet</strong> by hiring
            Nashville's top&nbsp;music professionals remotely.
          </Info>

          <VideoWrapper>
            <ResponsiveVideoContainer>
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
            </ResponsiveVideoContainer>
          </VideoWrapper>

          <FeatureCardContainer>
            <FeatureCard title="find the perfect fit" number="one">
              Search our <strong>curated roster</strong> of Nashville's best music pros to find your
              match.
            </FeatureCard>

            <FeatureCard title="order" number="two">
              Order and <strong>send all needed files and information</strong> via our streamlined
              messenger so your Nashville pro can do their thing.
            </FeatureCard>

            <FeatureCard title="receive" number="three">
              <strong>Receive amazing tracks</strong> that make you wanna do a little dance.
            </FeatureCard>
          </FeatureCardContainer>
        </Constrainer>
      </div>
    </div>
  )
}
