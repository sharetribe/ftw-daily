import React from 'react'
import { css } from 'styled-components/macro'
import guitarHero from '../../../assets/images/guitarHero.jpg'
import nfhLogoWhite from '../../../assets/images/nfhLogoWhite.png'

export const LandingHero: React.FC = () => {
  return (
    <div
      css={css`
        position: relative;
        background-image: url(${guitarHero});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 570px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 345px;
          height: auto;
          z-index: 2;
        }

        @media (min-width: 769px) {
          background-image: none;
          background-color: transparent;
        }
      `}
    >
      <img src={nfhLogoWhite} alt="Nashville For Hire logo" />
    </div>
  )
}
