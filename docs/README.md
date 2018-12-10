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

## How to customize this template

The easiest way to start a customization project is to read through the
[customization guide](customization-guide.md). After that, you probably should start with changing
[translations](translations.md), [common styles](styling.md) in marketplace.css, and then create
[static pages](static-pages.md) and modify
[Terms of Service and Privacy Policy pages](terms-of-service-and-privacy-policy.md).

Documentation for specific topics can be found in the following files:

- [Customization guide](customization-guide.md)
- [Folder structure](folder-structure.md)
- [Integration to map providers](map-providers.md)
- [Translations](translations.md)
- [Styling a marketplace](styling.md)
- [Static pages](static-pages.md)
- [Terms of Service and Privacy Policy](terms-of-service-and-privacy-policy.md)
- [Routing](routing.md)
- [Redux and duck files](redux.md)
- [Extended data](extended-data.md)
- [Extend the listing data model](extend-listing.md)
- [Search filters](search-filters.md)
- [Testing](testing.md)
- [Error logging with Sentry](sentry.md)
- [Analytics](analytics.md)
- [Continuous Integration (CI)](ci.md)
- [Content Security Policy (CSP)](content-security-policy.md)
- [Original create-react-app documentation](https://github.com/sharetribe/create-react-app/blob/master/packages/react-scripts/template/README.md)
- [Customization checklist](customization-checklist.md)
- [Icons](icons.md)
- [Improving performance](improving-performance.md)
- [Deploying to production](deploying-to-production.md)

The application was bootstrapped with a forked version of
[create-react-app](https://github.com/facebookincubator/create-react-app). While most of the
original documentation still applies, there are some important differences listed in the
[sharetribe-scripts](https://www.npmjs.com/package/sharetribe-scripts) NPM package.
