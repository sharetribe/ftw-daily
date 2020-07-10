import React from 'react'
import 'styled-components/macro'

export const Constrainer: React.FC = ({ children }) => {
  return <div css={{ maxWidth: 1300, padding: '0 1rem', margin: '0 auto' }}>{children}</div>
}
