import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './LandingPageAdvantages.css';
import { FormattedMessage, injectIntl  } from '../../util/reactIntl';

const AdvantageComponent = ({ title, messageId, intl }) => (
  <div className={css.advantage}>
    <img src='/static/icons/streamline-icon-check-circle@48x48.png' alt={intl.formatMessage({ id: title })} style={{ width: 40, marginTop: '14px' }} />
    <div>
      <h3 className={css.advantageTitle}><FormattedMessage id={title} /></h3>
      <p className={css.advantageText}><FormattedMessage id={messageId} /></p>
    </div>
  </div>
);

const Advantage = injectIntl(AdvantageComponent)

const LandingPageAdvantages = () => {
  return (
    <>
      <div className={css.advantages}>
        <Advantage title="LandingPage.advantage1Title" messageId="LandingPage.advantage1" />
        <Advantage title="LandingPage.advantage2Title" messageId="LandingPage.advantage2" />
        <Advantage title="LandingPage.advantage3Title" messageId="LandingPage.advantage3" />
      </div>
    </>
  );
};

export default LandingPageAdvantages;
