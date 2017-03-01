import { types } from 'sharetribe-sdk';

const { UUID, LatLng } = types;

// Create a user that conforms to the util/propTypes user schema
export const createUser = id => ({
  id: new UUID(id),
  type: 'user',
  attributes: {
    email: `${id}@example.com`,
    profile: { firstName: `${id} first name`, lastName: `${id} last name`, slug: `${id}-slug` },
  },
});

// Create a user that conforms to the util/propTypes listing schema
export const createListing = id => ({
  id: new UUID(id),
  type: 'listing',
  attributes: {
    title: `${id} title`,
    description: `${id} description`,
    address: `${id} address`,
    geolocation: new LatLng(40, 60),
  },
});
