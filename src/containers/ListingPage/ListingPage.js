import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Page } from '../../components';

const ListingPage = ({ params }) => {
  // Listing id should be located either in the end of slug
  // - https://example.com/l/listing-title-as-slug-12345
  // - https://example.com/l/12345
  const slugAndId = params.slug.split('-');
  const id = slugAndId[slugAndId.length - 1];

  // TODO: Fetch data from SDK if no data is passed through props
  return (
    <Page title={`Listing page with listing id: #${id}`}>
      <p>Slug: {params.slug}</p>
      <Link to={`/checkout/${id}`}><button>Book</button></Link>
    </Page>
  );
};

const { shape, string } = PropTypes;

ListingPage.propTypes = { params: shape({ slug: string.isRequired }).isRequired };

export default ListingPage;
