import React, { Component } from "react";
import Switch from "react-switch";
import ReactTooltip from 'react-tooltip';

import css from './SwitchButton.css';
 
class SwitchButton extends Component {
  constructor() {
    super();
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }
 
  render() {
    return (
      <label data-tip className={css.disable}>
        <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
            onColor="#86d3ff"
            onHandleColor="#41a6df"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch" onChange={this.handleChange} checked={this.state.checked} />
          <ReactTooltip place="left" className={css.customTip} effect='solid'>
          <span className={css.tipColor}>  
          Disable Search
          </span>
          </ReactTooltip>
      </label>
    );
  }
}

export default SwitchButton;