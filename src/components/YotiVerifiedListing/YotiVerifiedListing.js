import React, { Component } from 'react';
import yoti from '../../components/SectionFeatured/images/yoti.png';
import css from './YotiVerifiedListing.css';
import ReactTooltip from 'react-tooltip';
import { NamedLink } from '../../components';

import verified from './verified.png';

class YotiVerifiedListing extends Component {
  render() {
    return (
      <span className={css.yotiVerified}>
      <span className={css.separatorVerified}>•</span>
      <NamedLink className={css.removelink} name="YotiPage">
      <span data-tip>
        <img src={yoti} />
        <ReactTooltip className={css.customTip} effect='solid'>
        <span className={css.tipColor}>  
        Verified by YOTI <img className={css.verifiedImg} src={verified} />
        </span>
      </ReactTooltip>
        <span className={css.verified}>Verified</span>
      </span>
      </NamedLink>
      </span>
    );
  }
}

export default YotiVerifiedListing;
