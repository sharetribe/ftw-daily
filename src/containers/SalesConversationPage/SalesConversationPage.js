import React from 'react';
import { Link } from 'react-router';
import { Page } from '../../components';

export default (props) => {
  const { params } = props;
  return (
    <Page title="Sales conversation page" >
      <p>Sale id: { params.id }</p>
      <Link to={ `/sale/${params.id}/discussion` }>Discussion tab</Link>
      <br />
      <Link to={ `/sale/${params.id}/details` }>Details tab</Link>
      <p>Mobile layout needs different views for discussion and details.</p>
      <p>Discussion view is the default if route doesn't specify mobile tab (e.g. <i>/order/1234</i>)</p>
    </Page>
  );
};
