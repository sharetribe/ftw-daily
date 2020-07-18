import React from 'react'
import styled from 'styled-components'

const VideoWrapper = styled.div`
  max-width: 680px;
  margin: 0 auto;
`

const ResponsiveVideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  max-width: 100%;
  margin: 0;
  overflow: hidden;
  border-radius: 4px;
`

export const ResponsiveVideo: React.FC<{ title: string; src: string }> = ({ title, src }) => {
  return (
    <VideoWrapper>
      <ResponsiveVideoContainer>
        <iframe
          title={title}
          src={src}
          width="640"
          height="360"
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
    </VideoWrapper>
  )
}
