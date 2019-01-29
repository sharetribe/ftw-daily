# Flex Template for Web: Documentation

## Why Saunatime?

_Short answer:_ Demonstrate the features of Flex with a marketplace for renting saunas. Because why
not.

_Long answer:_ Saunatime works as a template for a marketplace user interface. It can be used as a
marketplace client out of the box but is intended to be modified to match the requirements of each
marketplace built on top of the Flex API. Also, marketplaces that do not use Saunatime as a template
for building a client can use this template application as a reference on how the Flex API can be
used in a browser environment using the JavaScript SDK.

Marketplace features included in Saunatime:

- **Location search** shows the user if there are saunas available in a given location.
- **The listing page** gives a detailed view about what a particular sauna offers.
- **Transaction process**: Saunatime uses nightly booking.
- **Notifications**: Emails are sent during the booking process to alert customers and providers
  about changes in the booking state.
- **Inbox** lists **orders** and **sales**.
- **Reviews** can be given after a completed transaction.
- **User profiles** provide detailed information about a given user.
- **Extended data:** The listing and user data models are modified using extended data.

## Flex Docs website

We are currently moving documentation to the Flex Docs site, so at the moment part of the
documentation is in this repository and part is in the Flex Docs site.

See the Flex Docs site: https://www.sharetribe.com/docs/

## Getting started

We recommend going through the
[Getting started articles](https://www.sharetribe.com/docs/background/getting-started/) in the Flex
Docs:

- [Introducing Flex](https://www.sharetribe.com/docs/background/introducing-flex/)
- [What development skills are needed?](https://www.sharetribe.com/docs/background/development-skills/)
- [Getting started with FTW](https://www.sharetribe.com/docs/tutorials/getting-started-with-ftw/)

## Customization guide

The easiest way to start a customization project is to read through the
[How to Customize FTW](https://www.sharetribe.com/docs/guides/how-to-customize-ftw/) guide in Flex
Docs.

## How to customize this template

After going through the customization guide, you should probably start with the following guides in
Flex Docs:

- [How to set up Mapbox for FTW](https://www.sharetribe.com/docs/guides/how-to-set-up-mapbox-for-ftw/)
- [How to change FTW UI texts and translations](https://www.sharetribe.com/docs/guides/how-to-change-ftw-ui-texts-and-translations/)
- [How to customize FTW styles](https://www.sharetribe.com/docs/guides/how-to-customize-ftw-styles/)
- [How to change Terms of Service and Privacy Policy in FTW](https://www.sharetribe.com/docs/guides/how-to-change-tos-and-privacy-policy-in-ftw/)
- [How to change FTW icons](https://www.sharetribe.com/docs/guides/how-to-change-ftw-icons/)
- [FTW customization checklist](https://www.sharetribe.com/docs/guides/ftw-customization-checklist/)
- [How to deploy FTW to production](https://www.sharetribe.com/docs/guides/how-to-deploy-ftw-to-production/)

See also the following articles:

- [How to extend listing data in FTW](https://www.sharetribe.com/docs/guides/how-to-extend-listing-data-in-ftw/)
- [How to change search filters in FTW](https://www.sharetribe.com/docs/guides/how-to-change-search-filters-in-ftw/)
- [How to add static pages in FTW](https://www.sharetribe.com/docs/guides/how-to-add-static-pages-in-ftw/)
- [How to test FTW](https://www.sharetribe.com/docs/guides/how-to-test-ftw/)
- [How to set up Sentry to log errors in FTW](https://www.sharetribe.com/docs/guides/how-to-set-up-sentry-to-log-errors-in-ftw/)
- [How to set up Analytics for FTW](https://www.sharetribe.com/docs/guides/how-to-set-up-analytics-for-ftw/)
- [How to set up Content Security Policy (CSP) for FTW](https://www.sharetribe.com/docs/guides/how-to-set-up-csp-for-ftw/)
- [How to use CI with FTW](https://www.sharetribe.com/docs/guides/how-to-use-ci-with-ftw/)

Extra documentation for specific topics can be found in the following files:

- [Folder structure](folder-structure.md)
- [Routing](routing.md)
- [Redux and duck files](redux.md)
- [Improving performance](improving-performance.md)
- [Original create-react-app documentation](https://github.com/sharetribe/create-react-app/blob/master/packages/react-scripts/template/README.md)

The application was bootstrapped with a forked version of
[create-react-app](https://github.com/facebookincubator/create-react-app). While most of the
original documentation still applies, there are some important differences listed in the
[sharetribe-scripts](https://www.npmjs.com/package/sharetribe-scripts) NPM package.
