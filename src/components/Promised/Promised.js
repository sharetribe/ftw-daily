/**
 * Promised component makes it easier to render content that
 * depends on resolution of a Promise.
 *
 * How to use:
 * <Promised promise={givenPromise} onSuccess={v => <div>{v}</div>} />
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
    const { onError, onSuccess } = this.props;
    return this.state.error ? onError(this.state.error) : onSuccess(this.state.value);
  }
}

Promised.defaultProps = { onError: e => e };

const { func, object } = PropTypes;

Promised.propTypes = {
  promise: object.isRequired,
  onSuccess: func.isRequired,
  onError: func,
};

export default Promised;
