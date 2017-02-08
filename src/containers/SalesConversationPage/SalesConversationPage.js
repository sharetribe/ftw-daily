/* eslint-disable react/no-unescaped-entities */
import React, { PropTypes } from 'react';
import { PageLayout, NamedLink } from '../../components';

const SalesConversationPage = props => {
  const { params } = props;
  return (
    <PageLayout title="Sales conversation page">
      <p>Sale id: {params.id}</p>
      <NamedLink name="SaleDiscussionPage" params={{ id: params.id }}>Discussion tab</NamedLink>
      <br />
      <NamedLink name="SaleDetailsPage" params={{ id: params.id }}>Details tab</NamedLink>
      <p>Mobile layout needs different views for discussion and details.</p>
      <p>
        Discussion view is the default if route doesn't specify mobile tab (e.g. <i>
          /order/1234
        </i>)
      </p>
    </PageLayout>
  );
};

const { shape, number } = PropTypes;

SalesConversationPage.propTypes = { params: shape({ id: number.isRequired }).isRequired };

export default SalesConversationPage;
