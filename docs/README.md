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
  tutorial.

## How to customize this template

The easiest way to start a customization project is to read through the
[customization guide](customization-guide.md). After that, you probably should start with changing
[translations](translations.md), [common styles](styling.md) in marketplace.css, and then create
[static pages](static-pages.md) and modify
[Terms of Service and Privacy Policy pages](terms-of-service-and-privacy-policy.md).

Documentation for specific topics can be found in the following files:

- [Customization guide](customization-guide.md)
- [Folder structure](folder-structure.md)
- [Translations](translations.md)
- [Styling a marketplace](styling.md)
- [Static pages](static-pages.md)
- [Terms of Service and Privacy Policy](terms-of-service-and-privacy-policy.md)
- [Routing](routing.md)
- [Redux and duck files](redux.md)
- [Extended data](extended-data.md)
  - See also the
    [Extended data reference](https://www.sharetribe.com/docs/references/extended-data/) in Flex
    Docs
- [Extend the listing data model](extend-listing.md)
- [Search filters](search-filters.md)
- [Testing](testing.md)
- [Continuous Integration (CI)](ci.md)
- [Original create-react-app documentation](https://github.com/sharetribe/create-react-app/blob/master/packages/react-scripts/template/README.md)
- [Customization checklist](customization-checklist.md)
- [Icons](icons.md)
- [Improving performance](improving-performance.md)
- [Deploying to production](deploying-to-production.md)

See also the following articles in the [Flex Docs](https://www.sharetribe.com/docs/) website:

- [How to set up Mapbox for FTW](https://www.sharetribe.com/docs/guides/how-to-set-up-mapbox-for-ftw/)
- [How to set up Sentry to log errors in FTW](https://www.sharetribe.com/docs/guides/how-to-set-up-sentry-to-log-errors-in-ftw/)
- [How to set up Analytics for FTW](https://www.sharetribe.com/docs/guides/how-to-set-up-analytics-for-ftw/)
- [How to set up Content Security Policy (CSP) for FTW](https://www.sharetribe.com/docs/guides/how-to-set-up-csp-for-ftw/)

The application was bootstrapped with a forked version of
[create-react-app](https://github.com/facebookincubator/create-react-app). While most of the
original documentation still applies, there are some important differences listed in the
[sharetribe-scripts](https://www.npmjs.com/package/sharetribe-scripts) NPM package.
