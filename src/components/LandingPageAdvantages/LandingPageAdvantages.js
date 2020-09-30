import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './LandingPageAdvantages.css';
import { FormattedMessage, injectIntl  } from '../../util/reactIntl';

const icon = [
  <svg className={css.advantageIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#8E2B91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 4L12 14.01L9 11.01" stroke="#8E2B91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg className={css.advantageIcon} xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path d="M23.2221 12C23.2266 13.7081 22.8275 15.393 22.0574 16.9176C21.1443 18.7446 19.7406 20.2813 18.0035 21.3555C16.2664 22.4298 14.2646 22.9992 12.2221 23C10.5141 23.0044 8.82912 22.6053 7.30451 21.8353L1.22168 23L2.38688 16.9176C1.61679 15.393 1.21772 13.7081 1.22218 12C1.22297 9.95758 1.79238 7.9557 2.86663 6.21861C3.94089 4.48152 5.47755 3.07782 7.30451 2.16474C8.82912 1.39465 10.5141 0.995583 12.2221 1.00004H12.8692C15.5666 1.14885 18.1143 2.28737 20.0245 4.19761C21.9348 6.10785 23.0733 8.65556 23.2221 11.3529V12Z" stroke="#8E2B91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7.75085" cy="12" r="1.47058" fill="#8E2B91" />
    <circle cx="12.4579" cy="12" r="1.47058" fill="#8E2B91" />
    <circle cx="17.1639" cy="12" r="1.47058" fill="#8E2B91" />
  </svg>,
  <svg className={css.advantageIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="#8E2B91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 10H23" stroke="#8E2B91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
]

const Advantage = ({ title, messageId, index }) => (
  <div className={css.advantage}>
    {icon[0]}
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
