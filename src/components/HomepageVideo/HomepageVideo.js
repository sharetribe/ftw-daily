import React, { Component } from 'react';
import { Player, BigPlayButton } from 'video-react';
import { FormattedMessage } from 'react-intl';

import css from "./HomepageVideo.css"; 
import petowner from "./assets/petowner.png";
import petsitter from "./assets/petsitter.png";
import petownerVideo from "./assets/tmps.mp4";
import petsitterVideo from "./assets/petsitter.mp4";

class HomepageVideo extends Component {
  render() {
    return (
<div>
<div>
   <div className={css.title}>
        <span>Happy Pets | Happy Owners | Happy Sitters</span>
    </div>
    <br />
    <div className={css.subContainer}>
    <span className={css.videoSub}>Pets stay at home | No strange places | Just familiarity, routine and 1:1 attention!</span>
    </div>
</div>
  <div className={css.homepageFlex}>

    <div className={css.videoContainer}>
       <Player
      playsInline
      poster={petsitter}
      src={petsitterVideo}>
      <BigPlayButton position="center" />
      </Player>
    </div>

    <div className={css.videoContainer}>
       <Player
      playsInline
      poster={petowner}
      src={petownerVideo}>
      <BigPlayButton position="center" />
      </Player>
    </div>

  </div>
</div>
    );
  }
}

export default HomepageVideo;