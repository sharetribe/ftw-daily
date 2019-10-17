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
      <div className={css.title}>
        <FormattedMessage id="SectionUserReviews.titleLineOne" />
      </div>

      <div className={css.reviewsCards}>
        <div className={css.reviewCard}>
          <div className={css.userInfo}>
            <div className={css.userAvatarStub}></div>
            <div>
              <FormattedMessage id="SectionUserReviews.reviewOneName" />
            </div>
          </div>

          <div>
            <FormattedMessage id="SectionUserReviews.reviewOneText" />
          </div>
        </div>

        <div className={css.reviewCard}>
          <div className={css.userInfo}>
            <div className={css.userAvatarStub}></div>
            <div>
              <FormattedMessage id="SectionUserReviews.reviewTwoName" />
            </div>
          </div>

          <div>
            <FormattedMessage id="SectionUserReviews.reviewTwoText" />
          </div>
        </div>

        <div className={css.reviewCard}>
          <div className={css.userInfo}>
            <div className={css.userAvatarStub}></div>
            <div>
              <FormattedMessage id="SectionUserReviews.reviewThreeName" />
            </div>
          </div>

          <div>
            <FormattedMessage id="SectionUserReviews.reviewThreeText" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionUserReviews;
