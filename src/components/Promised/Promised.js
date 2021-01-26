/**
 * Promised component makes it easier to render content that
 * depends on resolution of a Promise.
 *
 * How to use:
 * <Promised promise={givenPromise} renderFulfilled={v => <b>{v}</b>} renderRejected={v => <b>v</b>} />
 */

/* eslint-disable no-underscore-dangle */
import { Component } from 'react';
import PropTypes from 'prop-types';

class Promised extends Component {
  constructor(props) {
    super(props);

    // success value is string to be more useful when rendering texts.
    this.state = {
      value: '',
      error: null,
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.promise
      .then(value => {
        if (this._isMounted) {
          this.setState({ value });
        }
      })
      .catch(error => {
        if (this._isMounted) {
          this.setState({ error });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
