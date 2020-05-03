import React, { Component } from 'react';
import yoti from '../../components/SectionFeatured/images/yoti.png';
import css from './YotiVerifiedProfile.css';
import ReactTooltip from 'react-tooltip';
import { NamedLink } from '../../components';

import verified from './verified.png';

class YotiVerifiedProfile extends Component {
  render() {
    return (
      <div className={css.yotiVerified}>
        <NamedLink className={css.removelink} name="YotiPage">
          <span data-tip>
            <img src={yoti} />
              <ReactTooltip className={css.customTip} effect='solid'>
                <span className={css.tipColor}>  
                Verified by YOTI <img className={css.verifiedImg} src={verified} />
                </span>
              </ReactTooltip>
            <span>Verified</span>
          </span>
        </NamedLink>
      </div>
    );
  }
}

export default YotiVerifiedProfile;
