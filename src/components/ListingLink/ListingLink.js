/*
  A component so safely link to the ListingPage of the given listing.

  When the listing is pending approval, the normal ListingPage won't
  work as the listing isn't yet published. This component links to the
  correct pending-approval variant URL or to the normal ListingPage
  based on the listing state.
*/
import React from 'react';
import { string, oneOfType, node } from 'prop-types';
import { NamedLink } from '../../components';
import { LISTING_STATE_PENDING_APPROVAL, propTypes } from '../../util/types';
import { createSlug } from '../../util/urlHelpers';

const PENDING_APPROVAL_VARIANT = 'pending-approval';

const ListingLink = props => {
  const { className, listing, children } = props;
  const listingLoaded = listing && listing.id;
  if (!listingLoaded) {
    return null;
  }
  const id = listing.id.uuid;
  const { title, state } = listing.attributes;
  const slug = createSlug(title);
  const isPendingApproval = state === LISTING_STATE_PENDING_APPROVAL;
  const linkProps = isPendingApproval
    ? {
        name: 'ListingPageVariant',
        params: {
          id,
          slug,
          variant: PENDING_APPROVAL_VARIANT,
        },
      }
    : {
        name: 'ListingPage',
        params: { id, slug },
      };
  return (
    <NamedLink className={className} {...linkProps}>
      {children ? children : listing.attributes.title || ''}
    </NamedLink>
  );
};
ListingLink.defaultProps = {
  className: null,
  listing: null,
  children: null,
};

ListingLink.propTypes = {
  className: string,
  listing: oneOfType([propTypes.listing, propTypes.ownListing]),
  children: node,
};

export default ListingLink;
