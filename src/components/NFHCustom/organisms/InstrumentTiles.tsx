import React from 'react'
import styled from 'styled-components'
import acousticGuitar from '../../../assets/images/instrumentIcons/acousticGuitar.png'
import bass from '../../../assets/images/instrumentIcons/bass.png'
import brass from '../../../assets/images/instrumentIcons/brass.png'
import drums from '../../../assets/images/instrumentIcons/drums.png'
import electricGuitar from '../../../assets/images/instrumentIcons/electricGuitar.png'
import femaleVocals from '../../../assets/images/instrumentIcons/femaleVocals.png'
import keys from '../../../assets/images/instrumentIcons/keys.png'
import maleVocals from '../../../assets/images/instrumentIcons/maleVocals.png'
import mastering from '../../../assets/images/instrumentIcons/mastering.png'
import mixing from '../../../assets/images/instrumentIcons/mixing.png'
import organ from '../../../assets/images/instrumentIcons/organ.png'
import piano from '../../../assets/images/instrumentIcons/piano.png'
import produce from '../../../assets/images/instrumentIcons/produce.png'
import programming from '../../../assets/images/instrumentIcons/programming.png'
import songwriting from '../../../assets/images/instrumentIcons/songwriting.png'
import strings from '../../../assets/images/instrumentIcons/strings.png'
import synth from '../../../assets/images/instrumentIcons/synth.png'
import topline from '../../../assets/images/instrumentIcons/topline.png'
import utility from '../../../assets/images/instrumentIcons/utility.png'

const InstrumentTilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -16px 3rem;

  img {
    border-radius: 10px;
    margin: 24px 16px;
  }
`

const images = [
  { alt: 'Female vocals', src: femaleVocals },
  { alt: 'Male vocals', src: maleVocals },
  { alt: 'Songwriting', src: songwriting },
  { alt: 'Topline', src: topline },
  { alt: 'Acoustic guitar', src: acousticGuitar },
  { alt: 'Electric guitar', src: electricGuitar },
  { alt: 'Bass', src: bass },
  { alt: 'Drums', src: drums },
  { alt: 'Piano', src: piano },
  { alt: 'Keys', src: keys },
  { alt: 'Synth', src: synth },
  { alt: 'Organ', src: organ },
  { alt: 'Programming', src: programming },
  { alt: 'Strings', src: strings },
  { alt: 'Utility', src: utility },
  { alt: 'Brass', src: brass },
  { alt: 'Mixing', src: mixing },
  { alt: 'Mastering', src: mastering },
  { alt: 'Produce your entire song', src: produce },
]

export const InstrumentTiles: React.FC = () => {
  return (
    <InstrumentTilesContainer>
      {images.map(({ alt, src }) => (
        <img key={src} alt={alt} src={src} width={200} />
      ))}
    </InstrumentTilesContainer>
  )
}
