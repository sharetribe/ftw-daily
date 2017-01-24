import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { PageLayout } from '../../components';

const ListingPage = ({ params }) => (
  <PageLayout title={`Listing page with listing id: #${params.id}`}>
    <p>Slug: {params.slug}</p>
    <Link to={`/checkout/${params.id}`}><button>Book</button></Link>
  </PageLayout>
);

const { shape, string } = PropTypes;

ListingPage.propTypes = { params: shape({ slug: string.isRequired }).isRequired };

export default ListingPage;
