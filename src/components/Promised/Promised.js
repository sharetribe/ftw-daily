/**
 * Promised component makes it easier to render content that
 * depends on resolution of a Promise.
 *
 * How to use:
 * <Promised promise={givenPromise} renderFulfilled={v => <b>{v}</b>} renderRejected={v => <b>v</b>} />
 */

import { Component, PropTypes } from 'react';

class Promised extends Component {
  constructor(props) {
    super(props);

    // success value is string to be more useful when rendering texts.
    this.state = {
      value: '',
      error: null,
    };
  }

  componentDidMount() {
    this.props.promise
      .then(value => {
        this.setState({ value });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { renderFulfilled, renderRejected } = this.props;
    return this.state.error ? renderRejected(this.state.error) : renderFulfilled(this.state.value);
  }
}

Promised.defaultProps = { renderRejected: e => e };

const { func, shape } = PropTypes;

Promised.propTypes = {
  promise: shape({
    then: func.isRequired, // usually promises are detected from this single function alone
  }).isRequired,
  renderFulfilled: func.isRequired,
  renderRejected: func.isRequired,
};

export default Promised;
