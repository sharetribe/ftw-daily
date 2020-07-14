import React from 'react'
import { css } from 'styled-components/macro'

export const InfoCard: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <div
      css={css`
        border-radius: 4px;
        background-color: rgba(221, 153, 114, 0.43);
        padding: 1.5rem;

        h3 {
          margin-top: 0;
          text-transform: uppercase;
          font-size: 24px;
          font-weight: 700;
          font-family: Source Sans Pro, sans-serif;
        }

        p {
          margin: 0;
        }
      `}
    >
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}
