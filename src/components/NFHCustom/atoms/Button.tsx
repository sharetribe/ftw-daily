import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: solid 2px;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
`

export const Button: React.FC = ({ children, ...otherProps }) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>
}
