import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage } from '../../util/reactIntl';
import css from './SectionPartners.css';

const SectionPartners = () => {
  return (
    <>
      <div className={css.partnersList}>
        <div><img src='/static/partners/ms.png' className={css.partnerIcon} /></div>
        <div><img src='/static/partners/starhorse.png' className={css.partnerIcon} /></div>
        <div><img src='/static/partners/cavallets.png' className={css.partnerIcon} /></div>
        <div><img src='/static/partners/SM.png' className={css.partnerIcon} /></div>
      </div>
    </>
  );
};

export default SectionPartners;
