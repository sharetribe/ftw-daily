import React from 'react';
import { Page } from '../../components';

export default (props) => {
  const { params } = props;
  return (
    <Page title="Conversation page">
      <p>Conversation id: { params.id }</p>
    </Page>
  );
};
