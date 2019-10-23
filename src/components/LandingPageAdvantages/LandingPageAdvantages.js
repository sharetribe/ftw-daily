import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './LandingPageAdvantages.css';
import { FormattedMessage } from '../../util/reactIntl';

const Advantage = ({ messageId }) => (
  <div className={css.advantage}>
     <img src='/static/icons/streamline-icon-check-circle@48x48.png' style={{width: 40}}/>
    <FormattedMessage id={messageId} />
  </div>
);

const LandingPageAdvantages = () => {
  return (
    <>
      <div className={css.advantages}>
        <Advantage messageId="LandingPage.advantage1" />
        <Advantage messageId="LandingPage.advantage2" />
        <Advantage messageId="LandingPage.advantage3" />
      </div>
    </>
  );
};

export default LandingPageAdvantages;
