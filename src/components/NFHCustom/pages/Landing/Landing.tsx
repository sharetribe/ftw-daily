import React from 'react'
import styled from 'styled-components'
import nashvilleForHireText from '../../../../assets/images/nashvilleForHireText.png'
import { FeatureCard, InfoCard, LandingHero } from '../../molecules'
import { Constrainer } from '../../layout'
import css from './Landing.css'

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
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 2rem;
`

const CTAButton = styled.button`
  display: block;
  margin: 0 auto 3rem;
  padding: 18px 40px;
  border: none;
  font: inherit;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: 700;
  font-size: 120%;
`

const InfoCardContainer = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 3rem;
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

          <CTAButton className={css.ctaButton}>find your nashville pro</CTAButton>

          <InfoCardContainer>
            <InfoCard title="no travel">Hire from anywhere.</InfoCard>
            <InfoCard title="no studio fees">All work done remotely</InfoCard>
            <InfoCard title="no hassle">All files transferred online.</InfoCard>
            <InfoCard title="no risk">Money-Back-Guarantee on first order.</InfoCard>
          </InfoCardContainer>
        </Constrainer>
      </div>
    </div>
  )
}
