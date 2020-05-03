import React, { Component } from 'react';
import yoti from '../../components/SectionFeatured/images/yoti.png';
import css from './YotiVerified.css';
import ReactTooltip from 'react-tooltip';
import { NamedLink } from '../../components';

import verified from './verified.png';

class YotiVerified extends Component {
  render() {
    return (
      <div className={css.yotiVerified}>
        <div>
          <h3 className={css.title}>Verify your identity</h3>
        </div>
      <NamedLink className={css.removelink} name="YotiPage">
      <span className={css.yotiContainer} data-tip>
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

export default YotiVerified;
