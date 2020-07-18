import React from 'react'
import 'styled-components/macro'
import { css } from 'styled-components'
import quotes from '../../../assets/images/quotes.png'

export const Testimonial: React.FC<{ name: string }> = ({ children, name }) => {
  return (
    <div
      css={css`
        text-align: center;
        max-width: 500px;
        background-color: #c5bfa2;
        margin: 16px;
        border-radius: 4px;
        padding: 0 1.5rem 1rem;
      `}
    >
      <img alt="Quotes" src={quotes} width={50} />
      <h2
        css={css`
          font-size: 30px;
          font-family: Source Sans Pro, sans-serif;
          text-transform: uppercase;
        `}
      >
        {name}
      </h2>
      <div
        css={css`
          font-size: 18px;
        `}
      >
        {children}
      </div>
    </div>
  )
}
