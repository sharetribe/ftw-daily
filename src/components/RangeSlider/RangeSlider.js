import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import { withDimensions } from '../../util/contextHelpers';

import Handle from './Handle';
import Track from './Track';
import css from './RangeSlider.module.css';

class RangeSliderComponent extends Component {
  constructor(props) {
    super(props);

    const { min, max, handles } = props;
    handles.forEach((h, index) => {
      if (h < min || h > max || (index < handles.length - 1 && h > handles[index + 1])) {
        throw new Error(
          'RangeSlider error: handles need to be given in ascending order and they need to be within min and max values'
        );
      }
    });

    this.state = { activeHandle: 0 };

    this.toPosition = this.toPosition.bind(this);
    this.toValue = this.toValue.bind(this);
    this.changeActive = this.changeActive.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toPosition(value) {
    const { dimensions, min, max } = this.props;
    const width = dimensions.width;
    const valueOffset = value - min;
    const scale = max - min;
    return Math.round((valueOffset / scale) * width);
  }

  toValue(position) {
    const { dimensions, min, max, step } = this.props;
    const width = dimensions.width;
    const scale = max - min;
    const value = Math.round((position / width) * scale) + min;
    return Math.ceil(value / step) * step;
  }

  changeActive(index) {
    this.setState({ activeHandle: index });
  }

  onChange(position, handleIndex) {
    this.props.onChange(Object.assign([...this.props.handles], { [handleIndex]: position }));
  }

  render() {
    const { handles, min, max } = this.props;

    return (
      <Track handles={handles} valueToPosition={this.toPosition}>
        {handles.map((h, index) => {
          const classes = classNames({ [css.activeHandle]: this.state.activeHandle === index });
          return (
            <Handle
              key={index}
              className={classes}
              value={h}
              min={index === 0 ? min : handles[index - 1]}
              max={index === handles.length - 1 ? max : handles[index + 1]}
              valueToPosition={this.toPosition}
              positionToValue={this.toValue}
              changeActive={() => this.changeActive(index)}
              onChange={value => this.onChange(value, index)}
            />
          );
        })}
      </Track>
    );
  }
}

RangeSliderComponent.defaultProps = {
  min: 0,
  max: 10000000,
  step: 1,
};

RangeSliderComponent.propTypes = {
  handles: arrayOf(number),
  min: number,
  max: number,
  step: number,
  dimensions: shape({
    height: number.isRequired,
    width: number.isRequired,
  }).isRequired,
};

const RangeSliderComponentWithDimensions = withDimensions(RangeSliderComponent);

const RangeSlider = props => {
  const { rootClassName, className, ...rest } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <RangeSliderComponentWithDimensions {...rest} />
    </div>
  );
};

RangeSlider.defaultProps = {
  rootClassName: null,
  className: null,
};

RangeSlider.propTypes = {
  rootClassName: string,
  className: string,
};

export default RangeSlider;
