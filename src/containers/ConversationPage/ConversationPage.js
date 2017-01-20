import React, { PropTypes } from 'react';
import { PageLayout } from '../../components';

const ConversationPage = props => {
  const { params } = props;
  return (
    <PageLayout title="Conversation page">
      <p>Conversation id: {params.id}</p>
    </PageLayout>
  );
};

const { shape, string } = PropTypes;

ConversationPage.propTypes = { params: shape({ id: string.isRequired }).isRequired };

export default ConversationPage;
