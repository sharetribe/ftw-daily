import React from 'react'
import styled from 'styled-components'
import nashvilleForHireText from '../../../../assets/images/nashvilleForHireText.png'
import { FeatureCard, InfoCard, LandingHero, ResponsiveVideo } from '../../molecules'
import { Constrainer } from '../../layout'
import css from './Landing.css'
import musicNotes from '../../../../assets/images/musicNotes.png'
import guitarOnBed from '../../../../assets/images/guitarOnBed.jpg'
import { InstrumentTiles, Testimonials, TestimonialVideo } from '../../organisms'

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

const FeatureCardContainer = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 3rem 0 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
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
  margin-bottom: 4rem;
`

const MusicNotesContainer = styled.div`
  display: flex;
  width: 820px;
  max-width: 100%;
  margin: 0 auto 3em;

  h2 {
    flex: 1 1 auto;
    font-family: Source Sans Pro, sans-serif;
    font-size: 36px;
  }

  img {
    flex: 0 0 auto;
    width: 185px;
    height: auto;
  }

  @media (max-width: 600px) {
    img {
      display: none;
    }
  }
`

const Names = styled.p`
  padding: 1rem 2rem;
  border: 2px solid rgb(205, 133, 117);
  border-radius: 16px;
  font-family: Source Sans Pro, sans-serif;
  font-size: 24px;
  font-style: italic;
  width: 1100px;
  max-width: 100%;
  margin: 0 auto 4em;
  text-align: center;
`

const WhatDoesYourProjectNeed = styled.h2`
  font-family: Source Sans Pro, sans-serif;
  font-size: 36px;
  text-align: right;
  width: 1100px;
  max-width: 100%;
  margin: 0 auto 2rem;
  padding: 0 2rem;

  @media (max-width: 600px) {
    text-align: left;
    padding: 0;
  }
`

const TestimonialsHero = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  div {
    background-color: #ac7163;
    width: auto;
    max-width: 400px;
    padding: 2rem 0;

    img {
      position: relative;
      right: -3rem;
      max-width: 400px;
    }
  }

  h2 {
    margin-left: 6rem;
    font-family: Source Sans Pro, sans-serif;
    font-size: 36px;
  }

  @media (max-width: 600px) {
    flex-direction: column;

    div {
      display: none;
    }

    h2 {
      margin-left: 0;
    }
  }
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

          <ResponsiveVideo
            title="Nashville For Hire Video"
            src="https://player.vimeo.com/video/272277122"
          />

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

          <MusicNotesContainer>
            <div>
              <h2>Making great music is fun.</h2>
              <p>
                <strong>
                  <em>And</em> so is being able to brag to your friends and family
                </strong>{' '}
                that the musicians who worked on your project have{' '}
                <strong>also worked with...</strong>
              </p>
            </div>
            <img alt="Music notes" src={musicNotes} />
          </MusicNotesContainer>

          <Names>
            Maren Morris, Miley Cyrus, Chris Stapleton, Ludacris, Kelly Clarkson, Sam Hunt, Sheryl
            Crow, Eric Church, Alabama, 21 Pilots, Faith Hill, Amos Lee, Jason Aldean, Kelsea
            Ballerini, Chris Cornell, Tim McGraw, Bog Seger, Keith Urban, Luke Bryan, Weezer, Jewel,
            and mannnnnnny more.
          </Names>

          <WhatDoesYourProjectNeed>What does your project need?</WhatDoesYourProjectNeed>

          <InstrumentTiles />

          <TestimonialsHero>
            <div>
              <img alt="A person playing guitar" src={guitarOnBed} />
            </div>
            <h2>What are our clients saying about us?</h2>
          </TestimonialsHero>

          <Testimonials />

          <TestimonialVideo />
        </Constrainer>
      </div>
    </div>
  )
}
