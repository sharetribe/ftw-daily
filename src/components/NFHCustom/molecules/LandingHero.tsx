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

        div {
          background-color: rgba(249, 244, 238, 0.12);
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        img {
          width: 345px;
          height: auto;
        }
      `}
    >
      <img src={nfhLogoWhite} alt="Nashville For Hire logo" />
    </div>
  )
}
