import React, { PropTypes } from 'react';

const Hello = ({ name }) => <p>hello, {name}!</p>;

const { string } = PropTypes;

Hello.propTypes = { name: string.isRequired };

export default Hello;
