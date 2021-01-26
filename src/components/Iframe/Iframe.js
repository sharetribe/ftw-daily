import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Iframe.css';

const Iframe = ({ src }) => {

    if (!src) {
      return <div></div>;
    }

    return (
      <iframe className={css.iframe} src={src}></iframe>
    );
};

export default Iframe;
