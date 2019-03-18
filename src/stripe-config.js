/*
 * Stripe related configuration.
 */

// NOTE: REACT_APP_STRIPE_PUBLISHABLE_KEY is mandatory environment variable.
// This variable is set in a hidden file: .env
// To make Stripe connection work, you also need to set Stripe's private key in the Flex Console.
export const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

// Stripe only supports payments in certain countries, see full list
// at https://stripe.com/global
//
export const stripeSupportedCountries = [
  {
    // Australia
    code: 'AU',
    currency: 'AUD',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
      state: true,
    },
    accountConfig: {
      bsb: true,
      accountNumber: true,
    },
  },
  {
    // Austria
    code: 'AT',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Belgium
    code: 'BE',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Canada
    code: 'CA',
    currency: 'CAD',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
      province: true,
    },
    accountConfig: {
      transitNumber: true,
      institutionNumber: true,
      accountNumber: true,
    },
  },
  {
    // Denmark
    code: 'DK',
    currency: 'DKK',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Finland
    code: 'FI',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // France
    code: 'FR',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Germany
    code: 'DE',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Hong Kong
    code: 'HK',
    currency: 'HKD',
    addressConfig: {
      addressLine: true,
      city: true,
    },
    accountConfig: {
      clearingCode: true,
      branchCode: true,
      accountNumber: true,
    },
    personalIdNumberRequired: true,
    companyConfig: {
      personalAddress: true,
    },
  },
  {
    // Ireland
    code: 'IE',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Italy
    code: 'IT',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Luxembourg
    code: 'LU',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Netherlands
    code: 'NL',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // New Zealand
    code: 'NZ',
    currency: 'NZD',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      accountNumber: true,
    },
  },
  {
    // Norway
    code: 'NO',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Portugal
    code: 'PT',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Spain
    code: 'ES',
    currency: 'EUR',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Sweden
    code: 'SE',
    currency: 'SEK',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // Switzerland
    code: 'CH',
    currency: 'CHF',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      iban: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // United Kingdom
    code: 'GB',
    currency: 'GBP',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
    },
    accountConfig: {
      sortCode: true,
      accountNumber: true,
    },
    companyConfig: {
      personalAddress: true,
      additionalOwners: true,
    },
  },
  {
    // United States
    code: 'US',
    currency: 'USD',
    addressConfig: {
      addressLine: true,
      city: true,
      postalCode: true,
      state: true,
    },
    accountConfig: {
      routingNumber: true,
      accountNumber: true,
    },
    ssnLast4Required: true,
  },
];
