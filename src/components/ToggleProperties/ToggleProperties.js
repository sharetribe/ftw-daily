import React, { Component } from 'react';
import css from './ToggleProperties.css';
import { PropertyGroup,  } from '../../components';

export default class ToggleProperties extends Component {

  constructor(props) {
    super(props)

    this.state = {
      propertiesExpanded: false
    }
  }

  handlePropertiesToggling = () => {
    this.setState({
      propertiesExpanded: !this.state.propertiesExpanded
    })
  }

  render() {
    const { rootClassName, className, id, options, selectedOptions, twoColumns, threeColumns } = this.props;
    const { propertiesExpanded } = this.state;

    return (
      <div className={css.togglePropertiesWrapper}>
        <div className={css.togglePropertiesInner} data-expanded={propertiesExpanded}>
          <PropertyGroup
            rootClassName={rootClassName}
            className={className}
            id={id}
            options={options}
            selectedOptions={selectedOptions}
            threeColumns={threeColumns}
            twoColumns={twoColumns}
          />
        </div>

        {!propertiesExpanded &&
          <div className={css.blurredLine}></div>
        }

        <button
          className={`${css.toggleButton} ${propertiesExpanded ? css.toggleButtonExpanded : ''}`}
          onClick={this.handlePropertiesToggling}>
          {propertiesExpanded ? 'Weniger' : 'Mehr'}
        </button>
      </div>
    )
  }
}
