import { types } from './sdkLoader';

const { UUID, LatLng, Money } = types;

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
    price: new Money(5500, 'USD'),
    description: `${id} description`,
    address: `${id} address`,
    geolocation: new LatLng(40, 60),
  },
});

// Default config for currency formatting in tests and examples.
export const currencyConfig = {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'symbol',
  useGrouping: true,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  subUnitDivisor: 100,
};

// Create fake Internalization object to help with shallow rendering.
export const fakeIntl = {
  formatDate: d => d,
  formatHTMLMessage: d => d,
  formatMessage: msg => msg.id,
  formatNumber: d => d,
  formatPlural: d => d,
  formatRelative: d => d,
  formatTime: d => d,
  now: d => d,
};
