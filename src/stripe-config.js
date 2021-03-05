/* Stripe related configuration.

NOTE: REACT_APP_STRIPE_PUBLISHABLE_KEY is mandatory environment variable.
This variable is set in a hidden file: .env
To make Stripe connection work, you also need to set Stripe's private key in the Flex Console.
*/

export const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

/**
 * Default merchant category code (MCC)
 * MCCs are used to classify businesses by the type of goods or services they provide.
 *
 * In FTW we use code 5734 Computer Software Stores as a default for all the connected accounts.
 *
 * See the whole list of MCC codes from https://stripe.com/docs/connect/setting-mcc#list
 */
export const defaultMCC = '5734';

/*
Stripe only supports payments in certain countries, see full list
at https://stripe.com/global

You can find the bank account formats from https://stripe.com/docs/connect/payouts-bank-accounts
*/

export const stripeCountryDetails = [
  {
    //Australia
    code: 'AU',
    currency: 'AUD',
    accountConfig: {
      bsb: true,
      accountNumber: true,
    },
  },
  {
    // Austria
    code: 'AT',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Belgium
    code: 'BE',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    //Bulgraia
    code: 'BG',
    currency: 'BGN',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Canada
    code: 'CA',
    currency: 'CAD',
    accountConfig: {
      transitNumber: true,
      institutionNumber: true,
      accountNumber: true,
    },
  },
  {
    //Cyprus
    code: 'CY',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    //	Czech Republic
    code: 'CZ',
    currency: 'CZK',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Denmark
    code: 'DK',
    currency: 'DKK',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Estionia
    code: 'EE',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Finland
    code: 'FI',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // France
    code: 'FR',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Germany
    code: 'DE',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Greece
    code: 'GR',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Hong Kong
    code: 'HK',
    currency: 'HKD',
    accountConfig: {
      clearingCode: true,
      branchCode: true,
      accountNumber: true,
    },
  },
  {
    // Hungary
    code: 'HU',
    currency: 'HUF',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Ireland
    code: 'IE',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Italy
    code: 'IT',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Japan
    code: 'JP',
    currency: 'JPY',
    accountConfig: {
      bankName: true,
      branchName: true,
      bankCode: true,
      branchCode: true,
      accountNumber: true,
      accountOwnerName: true,
    },
  },
  {
    // Latvia
    code: 'LV',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Lithuania
    code: 'LT',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Luxembourg
    code: 'LU',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Malta
    code: 'MT',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Mexico
    code: 'MX',
    currency: 'MXN',
    accountConfig: {
      clabe: true,
    },
  },
  {
    // Netherlands
    code: 'NL',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // New Zealand
    code: 'NZ',
    currency: 'NZD',
    accountConfig: {
      accountNumber: true,
    },
  },
  {
    // Norway
    code: 'NO',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Poland
    code: 'PL',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Portugal
    code: 'PT',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Romania
    code: 'RO',
    currency: 'RON',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Singapore
    code: 'SG',
    currency: 'SGD',
    accountConfig: {
      bankCode: true,
      branchCode: true,
      accountNumber: true,
    },
  },
  {
    // Slovakia
    code: 'SK',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Slovenia
    code: 'SI',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Spain
    code: 'ES',
    currency: 'EUR',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Sweden
    code: 'SE',
    currency: 'SEK',
    accountConfig: {
      iban: true,
    },
  },
  {
    // Switzerland
    code: 'CH',
    currency: 'CHF',
    accountConfig: {
      iban: true,
    },
  },
  {
    // United Kingdom
    code: 'GB',
    currency: 'GBP',
    accountConfig: {
      sortCode: true,
      accountNumber: true,
    },
  },
  {
    // United States
    code: 'US',
    currency: 'USD',
    accountConfig: {
      routingNumber: true,
      accountNumber: true,
    },
  },
];

/*
NOTE: This configuration will not be updated!
We might remove this code in the later releases.

With Connect Onboarding Stripe will handle collecting most of the information about user. For new setup we only need the list of countries and accountConfig.
If you want to handle the whole onboarding flow on your on application, you can use the old PayoutDetailsForm as a starting point. That form uses this configuration option.
You should make sure that the list of countries is up-to-date and that the config contains all the required infomation you need to collect.

Remember to change the import from config.js if you want to use this config!

This setup is for API version '2019-02-19' and later.
If you have an older API version in use, you need to update your Stripe API.
You can check your Stripe API version from Stripe Dashboard -> Developers.
Stripe only supports payments in certain countries, see full list
at https://stripe.com/global
*/

// export const stripeSupportedCountries = [
//   {
//     // Australia
//     code: 'AU',
//     currency: 'AUD',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//       stateAU: true,
//     },
//     accountConfig: {
//       bsb: true,
//       accountNumber: true,
//     },
//   },
//   {
//     // Austria
//     code: 'AT',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Belgium
//     code: 'BE',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Canada
//     code: 'CA',
//     currency: 'CAD',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//       provinceCA: true,
//     },
//     accountConfig: {
//       transitNumber: true,
//       institutionNumber: true,
//       accountNumber: true,
//     },
//   },
//   {
//     // Denmark
//     code: 'DK',
//     currency: 'DKK',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Finland
//     code: 'FI',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // France
//     code: 'FR',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Germany
//     code: 'DE',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Hong Kong
//     code: 'HK',
//     currency: 'HKD',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//     },
//     accountConfig: {
//       clearingCode: true,
//       branchCode: true,
//       accountNumber: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       personalIdNumberRequired: true,
//     },
//     individualConfig: {
//       personalIdNumberRequired: true,
//     },
//   },
//   {
//     // Ireland
//     code: 'IE',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Italy
//     code: 'IT',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Luxembourg
//     code: 'LU',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Netherlands
//     code: 'NL',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // New Zealand
//     code: 'NZ',
//     currency: 'NZD',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       accountNumber: true,
//     },
//   },
//   {
//     // Norway
//     code: 'NO',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Portugal
//     code: 'PT',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Singapore
//     code: 'SG',
//     currency: 'SGD',
//     addressConfig: {
//       addressLine: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       bankCode: true,
//       branchCode: true,
//       accountNumber: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//       personalIdNumberRequired: true,
//     },
//     individualConfig: {
//       personalIdNumberRequired: true,
//     },
//   },
//   {
//     // Spain
//     code: 'ES',
//     currency: 'EUR',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Sweden
//     code: 'SE',
//     currency: 'SEK',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // Switzerland
//     code: 'CH',
//     currency: 'CHF',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       iban: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // United Kingdom
//     code: 'GB',
//     currency: 'GBP',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//     },
//     accountConfig: {
//       sortCode: true,
//       accountNumber: true,
//     },
//     companyConfig: {
//       personalAddress: true,
//       owners: true,
//     },
//   },
//   {
//     // United States
//     code: 'US',
//     currency: 'USD',
//     addressConfig: {
//       addressLine: true,
//       city: true,
//       postalCode: true,
//       stateUS: true,
//     },
//     accountConfig: {
//       routingNumber: true,
//       accountNumber: true,
//     },
//     companyConfig: {
//       businessURL: true,
//       companyPhone: true,
//       mccForUS: true,
//       owners: true,
//       personalAddress: true,
//       personalEmail: true,
//       personalPhone: true,
//       ssnLast4Required: true,
//     },
//     individualConfig: {
//       businessURL: true,
//       mccForUS: true,
//       ssnLast4Required: true,
//       personalEmail: true,
//       personalPhone: true,
//     },
//   },
// ];
