import React, { PropTypes } from 'react';
import { Page } from '../../components';

const EditProfilePage = (props, context) => {
  const { params } = props;
  return (
    <Page title={`Edit profile page with display name: ${params.displayName}`}>
    </Page>
  );
};

const { shape, string } = PropTypes;

EditProfilePage.propTypes = { params: shape({ displayName: string.isRequired }).isRequired };

export default EditProfilePage;
