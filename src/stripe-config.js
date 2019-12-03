/*
 * Stripe related configuration.
 *
 * Note: this setup is for API version '2019-02-19' and later.
 * If you have an older API version in use, you need to update your Stripe API.
 * You can check your Stripe API version from Stripe Dashboard -> Developers.
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
      stateAU: true,
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
      owners: true,
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
      owners: true,
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
      provinceCA: true,
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
      owners: true,
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
      owners: true,
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
      owners: true,
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
      owners: true,
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
    companyConfig: {
      personalAddress: true,
      personalIdNumberRequired: true,
    },
    individualConfig: {
      personalIdNumberRequired: true,
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
      owners: true,
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
      owners: true,
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
      owners: true,
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
      owners: true,
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
      owners: true,
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
      owners: true,
    },
  },
  {
    // Singapore
    code: 'SG',
    currency: 'SGD',
    addressConfig: {
      addressLine: true,
      postalCode: true,
    },
    accountConfig: {
      bankCode: true,
      branchCode: true,
      accountNumber: true,
    },
    companyConfig: {
      personalAddress: true,
      owners: true,
      personalIdNumberRequired: true,
    },
    individualConfig: {
      personalIdNumberRequired: true,
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
      owners: true,
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
      owners: true,
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
      owners: true,
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
      owners: true,
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
      stateUS: true,
    },
    accountConfig: {
      routingNumber: true,
      accountNumber: true,
    },
    companyConfig: {
      businessURL: true,
      companyPhone: true,
      mccForUS: true,
      owners: true,
      personalAddress: true,
      personalEmail: true,
      personalPhone: true,
      ssnLast4Required: true,
    },
    individualConfig: {
      businessURL: true,
      mccForUS: true,
      ssnLast4Required: true,
      personalEmail: true,
      personalPhone: true,
    },
  },
];
