import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { OrderDetailsPanel, OrderDiscussionPanel, NamedLink, PageLayout } from '../../components';

import css from './OrderPage.css';

const OrderPage = props => {
  const { params } = props;
  const orderId = params.id;

  const title = 'Banyan Studios';

  const detailsProps = {
    title,
    orderId,
    imageUrl: 'http://placehold.it/750x470',
    info: {
      pricePerDay: '55\u20AC',
      bookingPeriod: 'Jan 2nd - Jan 4th',
      bookingDuration: '3 days',
      total: '165\u20AC',
    },
    contact: {
      addressLine1: '350 5th Avenue',
      addressLine2: 'New York, NY 10118',
      phoneNumber: '+1 432 43184910',
    },
    confirmationCode: 'X2587X',
  };

  const detailsClassName = classNames(css.tabContent, {
    [css.tabContentVisible]: props.tab === 'details',
  });
  const discussionClassName = classNames(css.tabContent, {
    [css.tabContentVisible]: props.tab === 'discussion',
  });

  return (
    <PageLayout title={`Your ${title} booking is confirmed!`}>
      <NamedLink
        name="OrderDetailsPage"
        params={{ id: orderId }}
        activeClassName={css.activeTab}
        style={{ marginRight: '2rem' }}
      >
        Booking details
      </NamedLink>
      <NamedLink
        name="OrderDiscussionPage"
        activeClassName={css.activeTab}
        params={{ id: orderId }}
      >
        Discussion
      </NamedLink>
      <OrderDetailsPanel className={detailsClassName} {...detailsProps} />
      <OrderDiscussionPanel className={discussionClassName} />
    </PageLayout>
  );
};

const { string, shape, oneOfType, number, oneOf } = PropTypes;

OrderPage.propTypes = {
  params: shape({ id: oneOfType([number, string]).isRequired }).isRequired,
  tab: oneOf(['details', 'discussion']).isRequired,
};

export default OrderPage;
