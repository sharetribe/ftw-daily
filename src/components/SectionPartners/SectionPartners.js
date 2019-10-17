import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage } from '../../util/reactIntl'; 
import css from './SectionPartners.css'; 

const SectionPartners = () => {
  return (
    <>
      <div className={css.title}>
        <FormattedMessage id="SectionPartners.titleLineOne" />
      </div>

      <div className={css.partnersList}>
        <div className={css.partnerIconStub}></div>
        <div className={css.partnerIconStub}></div>
        <div className={css.partnerIconStub}></div>
        <div className={css.partnerIconStub}></div>
        <div className={css.partnerIconStub}></div>
      </div>
    </>
  );
};

export default SectionPartners;
