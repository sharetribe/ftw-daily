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
{/* verificacion : {
          reniec: true,
          sunat: false,
          remype: false
        } */}
      {/* TERNARY
      if "condition" then "this" else "that"
      condition ? "this" : "that" */}
      <ReactTooltip className={css.customTip} effect='solid'>
        <span className={css.tipColor}>  
        Verificado por RENIEC
        <img 
          className={css.verifiedImg} 
          // CAMBIA ICONO AQUI
          src={verified}
        />
        </span>
      </ReactTooltip>
        <span>Verificado</span>
      </span>
      </NamedLink>
      </div>
    );
  }
}

export default YotiVerified;
