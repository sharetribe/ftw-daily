import React from 'react'
import styled from 'styled-components/macro'
import one from '../../../assets/images/1.png'
import two from '../../../assets/images/2.png'
import three from '../../../assets/images/3.png'

type ImageNumber = 'one' | 'two' | 'three'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Title = styled.h3`
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 700;
  font-family: 'Source Sans Pro', sans-serif;
  color: rgba(93, 87, 109);
`

function chooseNumberImage(number: ImageNumber) {
  const src = { one: one, two: two, three: three }[number]

  return <img src={src} alt={`Number ${number}`} width={80} height={80} />
}

export const FeatureCard: React.FC<{ title: string; number: ImageNumber }> = ({
  children,
  number,
  title,
}) => {
  return (
    <Wrapper>
      {chooseNumberImage(number)}
      <Title>{title}</Title>
      <div>{children}</div>
    </Wrapper>
  )
}
