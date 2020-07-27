import React from 'react'
import styled from 'styled-components'

const ResponsiveVideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  max-width: 100%;
  margin: 0;
  overflow: hidden;
  border-radius: 4px;
`

export const ResponsiveVideo: React.FC<{
  title: string
  src: string
}> = ({ title, src }) => {
  return (
    <ResponsiveVideoContainer>
      <iframe
        title={title}
        src={src}
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
  )
}
