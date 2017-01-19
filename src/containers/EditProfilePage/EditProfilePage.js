import React, { PropTypes } from 'react';
import { Page } from '../../components';

const EditProfilePage = props => {
  const { params } = props;
  return <Page title={`Edit profile page with display name: ${params.displayName}`} />;
};

const { shape, string } = PropTypes;

EditProfilePage.propTypes = { params: shape({ displayName: string.isRequired }).isRequired };

export default EditProfilePage;
