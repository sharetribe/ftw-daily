import React, { Component } from 'react';
import RangeSlider from './RangeSlider';

class RangeSliderWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { handles: props.handles };
  }

  render() {
    return (
      <RangeSlider
        {...this.props}
        handles={this.state.handles}
        onChange={v => {
          this.setState({ handles: v });
        }}
      />
    );
  }
}

export const RangeSliderOneHandle = {
  component: RangeSliderWrapper,
  props: {
    min: 0,
    max: 1000,
    step: 5,
    handles: [500],
  },
  group: 'custom inputs',
};

export const RangeSliderTwoHandles = {
  component: RangeSliderWrapper,
  props: {
    min: 0,
    max: 1000,
    step: 5,
    handles: [333, 666],
  },
  group: 'custom inputs',
};

export const RangeSliderThreeHandles = {
  component: RangeSliderWrapper,
  props: {
    min: 0,
    max: 1000,
    step: 5,
    handles: [150, 490, 850],
  },
  group: 'custom inputs',
};
