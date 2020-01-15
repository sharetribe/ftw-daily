import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './LandingPageAdvantages.css';
import { FormattedMessage, injectIntl  } from '../../util/reactIntl';

const icon = [
  <svg className={css.advantageIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#8E2B91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M22 4L12 14.01L9 11.01" stroke="#8E2B91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>,
  <svg className={css.advantageIcon} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.623 4.26636H4.62305C4.09261 4.26636 3.58391 4.47707 3.20883 4.85214C2.83376 5.22722 2.62305 5.73592 2.62305 6.26636V20.2664C2.62305 20.7968 2.83376 21.3055 3.20883 21.6806C3.58391 22.0556 4.09261 22.2664 4.62305 22.2664H18.623C19.1535 22.2664 19.6622 22.0556 20.0373 21.6806C20.4123 21.3055 20.623 20.7968 20.623 20.2664V13.2664" stroke="#8E2B91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M19.123 2.76637C19.5209 2.36855 20.0604 2.14505 20.623 2.14505C21.1857 2.14505 21.7252 2.36855 22.123 2.76637C22.5209 3.1642 22.7444 3.70376 22.7444 4.26637C22.7444 4.82898 22.5209 5.36855 22.123 5.76637L12.623 15.2664L8.62305 16.2664L9.62305 12.2664L19.123 2.76637Z" stroke="#8E2B91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>,
  <svg className={css.advantageIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="#8E2B91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1 10H23" stroke="#8E2B91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
]

const Advantage = ({ title, messageId, index }) => (
  <div className={css.advantage}>
    {icon[index]}
    <div>
      <h3 className={css.advantageTitle}><FormattedMessage id={title} /></h3>
      <p className={css.advantageText}><FormattedMessage id={messageId} /></p>
    </div>
  </div>
);

const LandingPageAdvantages = () => {
  return (
    <>
      <div className={css.advantages}>
        <Advantage title="LandingPage.advantage1Title" messageId="LandingPage.advantage1" index={0}/>
        <Advantage title="LandingPage.advantage2Title" messageId="LandingPage.advantage2" index={1}/>
        <Advantage title="LandingPage.advantage3Title" messageId="LandingPage.advantage3" index={2}/>
      </div>
    </>
  );
};

export default LandingPageAdvantages;
