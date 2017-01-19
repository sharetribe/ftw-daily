import React, { PropTypes } from 'react';
import { Page } from '../../components';

const ProfilePage = ({ params }) => (
  <Page title={`Profile page with display name: ${params.displayName}`} />
);

const { shape, string } = PropTypes;

ProfilePage.propTypes = { params: shape({ displayName: string.isRequired }).isRequired };

export default ProfilePage;
