import React, { Component } from 'react';
import css from './ToggleText.css';

export default class ToggleText extends Component {

  constructor(props) {
    super(props)

    this.state = {
      textExpanded: false
    }
  }

  handleTextToggling = () => {
    this.setState({
      textExpanded: !this.state.textExpanded
    })
  }

  render() {
    const { children, CustomTag, className, customChildren, maxLength } = this.props;
    const { textExpanded } = this.state;
    const innerChildren = customChildren ? children.join("") : children;
    const shouldBeCropped = innerChildren.length > maxLength
 
    return (
      <div className={css.toggleTextWrapper}>
        <CustomTag className={className}>
          {
            (!textExpanded && shouldBeCropped) ? innerChildren.slice(0, maxLength) : innerChildren
          }
        </CustomTag>

        {!textExpanded && shouldBeCropped &&
          <div className={css.blurredLine}></div>
        }

        {shouldBeCropped &&
          <button
            className={`${css.toggleButton} ${textExpanded ? css.toggleButtonExpanded : ''}`}
            onClick={this.handleTextToggling}>
            {textExpanded ? 'Weniger' : 'Mehr'}
          </button>
        }
      </div>
    )
  }
}
