import React from 'react'
import { css } from 'styled-components/macro'
import { ResponsiveVideo } from '../molecules'

export const TestimonialVideo: React.FC = () => {
  return (
    <div
      css={css`
        text-align: center;
        margin-bottom: 1rem;
      `}
    >
      <h2
        css={css`
          font-size: 36px;
          font-family: Source Sans Pro, sans-serif;
        `}
      >
        Olivia Foy
      </h2>

      <div
        css={css`
          margin-bottom: 2rem;
        `}
      >
        Recording Artist
      </div>

      <ResponsiveVideo
        title="Olivia Foy"
        src="https://player.vimeo.com/f38af57d-3fac-44b3-b44c-a205d2b23945"
      />
    </div>
  )
}
