import React, { PropTypes } from 'react';
import { Page } from '../../components';

const ConversationPage = props => {
  const { params } = props;
  return (
    <Page title="Conversation page">
      <p>Conversation id: {params.id}</p>
    </Page>
  );
};

const { shape, string } = PropTypes;

ConversationPage.propTypes = { params: shape({ id: string.isRequired }).isRequired };

export default ConversationPage;
