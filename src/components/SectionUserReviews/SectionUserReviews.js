import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage } from '../../util/reactIntl';
import { ListingCard } from '../../components';
import css from './SectionUserReviews.css';

const Review = ({ name, text }) => <div>Review</div>;

const SectionUserReviews = () => {
  return (
    <>
      <div className={css.titleWrapper}>
        <div className={css.title}>
          <FormattedMessage id="SectionUserReviews.titleLineOne" />
        </div>
        <div className={css.title}>
          <FormattedMessage id="SectionUserReviews.titleLineTwo" />
        </div>
      </div>
      <div className={css.subTitle}>
        <FormattedMessage id="SectionUserReviews.subLine" />
      </div>
      <div className={css.reviewsCards}>
        <div className={css.reviewCard}>
          <div className={css.userInfo}>
            <img className={css.userAvatar} src='/static/userReviews/Marcel.jpg' alt='Marcel'/>
            <div>
              <FormattedMessage id="SectionUserReviews.reviewOneName" />
              <div className={css.userLocation}>
                <FormattedMessage id="SectionUserReviews.reviewOneLocation" />
              </div>
            </div>
          </div>

          <div>
            «<FormattedMessage id="SectionUserReviews.reviewOneText" />»
          </div>
        </div>

        <div className={css.reviewCard}>
          <div className={css.userInfo}>
            <img className={css.userAvatar} src='/static/userReviews/Michelle.jpg' alt='Michelle'/>
            <div>
              <FormattedMessage id="SectionUserReviews.reviewTwoName" />
              <div className={css.userLocation}>
                <FormattedMessage id="SectionUserReviews.reviewTwoLocation" />
              </div>
            </div>
          </div>

          <div>
            «<FormattedMessage id="SectionUserReviews.reviewTwoText" />»
          </div>
        </div>

        <div className={css.reviewCard}>
          <div className={css.userInfo}>
            <img className={css.userAvatar} src='/static/userReviews/Katja.jpg' alt='Katja'/>
            <div>
              <FormattedMessage id="SectionUserReviews.reviewThreeName" />
              <div className={css.userLocation}>
                <FormattedMessage id="SectionUserReviews.reviewThreeLocation" />
              </div>
            </div>
          </div>

          <div>
            «<FormattedMessage id="SectionUserReviews.reviewThreeText" />»
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionUserReviews;
