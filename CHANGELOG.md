# Change Log

We are not following semantic versioning in this template app since any change could potentially be
a breaking change for forked customization projects. We are still experimenting with what is a good
way to update this template, but currently, we follow a pattern:

- Major version change (v**X**.0.0): Changes to several pages and other components. Consider
  implementing this without merging upstream (we'll provide instructions).
- Minor version change (v0.**X**.0): New features and changes to a single page. These are likely to
  cause conflicts.
- Patch (v0.0.**X**): Bug fixes and small changes to components.

---

## Upcoming version 2019-XX-XX

## [v3.1.0] 2019-07-05

- [fix] SectionHero: fix type in search params. There was an extra "/s?".
  [#1124](https://github.com/sharetribe/flex-template-web/pull/1124)
- [add] Add support for Singapore as the payout country of a provider. Also fix a bug in passing the
  personal ID number to Stripe. [#1122](https://github.com/sharetribe/flex-template-web/pull/1122)
- [add] Add events.mapbox.com to `connect-src` in `csp.js` file.
  [#1123](https://github.com/sharetribe/flex-template-web/pull/1123)
- [change] Verify email automatically once the verification link is clicked. Redirect the user to
  the landing page after verification.
  [#1121](https://github.com/sharetribe/flex-template-web/pull/1121)

  [v3.0.0]: https://github.com/sharetribe/flex-template-web/compare/v3.0.0...v3.1.0

## [v3.0.0] 2019-07-02

- [add] Strong Customer Authentication (SCA) with Stripe's new PaymentIntents flow. This is a big
  change for checkout flow and includes a madatory transaction process change.
  [#1089](https://github.com/sharetribe/flex-template-web/pull/1089)

  - You should check [the pull request](https://github.com/sharetribe/flex-template-web/pull/1089)
  - and read 3 Flex Docs articles:
    [SCA](https://www.sharetribe.com/docs/background/strong-customer-authentication/),
    [PaymentIntents](https://www.sharetribe.com/docs/background/payment-intents/), and
    [How to take PaymentIntents into use](https://www.sharetribe.com/docs/guide/how-to-take-payment-intents-into-use/)

  [v3.0.0]: https://github.com/sharetribe/flex-template-web/compare/v2.17.1...v3.0.0

## [v2.17.1] 2019-06-11

- [fix] `stripeCardToken` didn't update when the user tried to book the same listing for a second
  time. This update will clear the old cardtoken from Redux store when redirecting to
  `TransactionPage`. [#1114](https://github.com/sharetribe/flex-template-web/pull/1114)
- [fix] In `LineItemProviderCommissionMaybe.js` file check that `providerCommissionLineItem` exists.
  In default transaction process the `providerCommissionLineItem` can be expected to be there but if
  the process is using only customer commission there will be error.
  [#1112](https://github.com/sharetribe/flex-template-web/pull/1112)
- [security] Update Flex SDK version to v1.4.1. The new version updates depencencies with security
  issues [#1111](https://github.com/sharetribe/flex-template-web/pull/1111)
- [fix] Fix a bug in showing review links. Because of the bug the second review link was not visible
  in `ActivityFeed`. [#1106](https://github.com/sharetribe/flex-template-web/pull/1106)
- [fix] Emptying the priceFilter component in the searchPage caused a page breaking error.
  [#1101](https://github.com/sharetribe/flex-template-web/pull/1101)

  [v2.17.1]: https://github.com/sharetribe/flex-template-web/compare/v2.17.0...v2.17.1

## [v2.17.0] 2019-05-23

- [change] Mapbox library dependencies updated to v1.0.0.
  [#1099](https://github.com/sharetribe/flex-template-web/pull/1099)
  - Note: Mapbox changed their pricing scheme!
- [fix] missing provider information (like SSN in US), might cause payment to fail on
  `CheckoutPage`. This improves related error message.
  [#1098](https://github.com/sharetribe/flex-template-web/pull/1098)
- [fix] Menu needs to wait for mounting to calculate dimensions properly.
  [#1096](https://github.com/sharetribe/flex-template-web/pull/1096)
- [fix] Renamed Component.example.css files to ComponentExample.css to fix bug introduced in one of
  the library updates. [#1095](https://github.com/sharetribe/flex-template-web/pull/1095)
- [add] `rawOnly` flag for Styleguide examples using fixed positioning or full-page dimensions.
  [#1094](https://github.com/sharetribe/flex-template-web/pull/1094)
- [fix] Show error when typing credit card number if e.g. the number is invalid. Fixes bug that was
  introduced in PR #1088. [#1092](https://github.com/sharetribe/flex-template-web/pull/1092)
- [change] Use Final Form on `StripePaymentForm` for consistency. Note that card form Stripe
  Elements in `StripePaymentForm` is not a Final Form field so it's not available trough Final Form
  but handled separately. [#1088](https://github.com/sharetribe/flex-template-web/pull/1088)
- [change] Move Stripe SDK call from `StripePaymentForm` to `stripe.duck.js` for consistency.
  [#1086](https://github.com/sharetribe/flex-template-web/pull/1086)

  [v2.17.0]: https://github.com/sharetribe/flex-template-web/compare/v2.16.0...v2.17.0

## [v2.16.0] 2019-05-08

This release makes 2 big updates to `sharetribe-scripts` package (which is our fork from Create
React App). It is updated from v1.1.5 ->
[2.1.8](https://github.com/sharetribe/create-react-app/blob/master/CHANGELOG-2.x.md#migrating-from-1x-to-203)
-> [3.0.0](https://github.com/sharetribe/create-react-app/blob/master/CHANGELOG.md). This brought up
a couple of changes:

- package.json has now a **"browserlist"** configuration key. This gives you an option to affect
  browser support (it affects CSS Autoprefixer and JS build output).
  [You might want to update it.](https://github.com/sharetribe/flex-template-web/pull/1073)
- IE support is removed from Create React App, but you can add polyfills yourself if needed.
- React was updated to a version that supports _Hooks_ and _Rules of React_ eslint plugin is
  included.
- All the npm vulnerability report exceptions were removed from `.auditrc`

There was also a couple of bug fixes you should check carefully:
[#1082](https://github.com/sharetribe/flex-template-web/pull/1082),
[#1084](https://github.com/sharetribe/flex-template-web/pull/1084).

**Changes:**

- [fix] Previous change from `currentUser.attributes.stripeConnected` to separately included
  `stripeAccount` caused errors since updates to currentUser entity didn't include `stripeAccount`.
  Including it every time sounds quite error-prone, so we reversed that change.
  [#1084](https://github.com/sharetribe/flex-template-web/pull/1084)
- [fix] Edit `updatedEntities` function in `util/data.js` so that it doesn't mutate the
  `oldEntities` argument. [#1079](https://github.com/sharetribe/flex-template-web/pull/1079)
- [change] Update sharetribe-scripts (CRA fork) to v3.0.0. There are a couple of changes that you
  should check from [#1081](https://github.com/sharetribe/flex-template-web/pull/1081)
  - Reserve use\* function naming pattern for React Hooks.
  - Recent SDK update changed the proptypes for snapshots.
  - Updated scripts/config.js after Prettier version bump
  - Removed unnecessary audit exceptions
- [fix] Ensure on `TransactionPage` that all the required data is loaded before showing the page.
  [#1082](https://github.com/sharetribe/flex-template-web/pull/1082)
- [fix] Use proper method for Sentry on logout to avoid error message.
  [#1080](https://github.com/sharetribe/flex-template-web/pull/1080),
- [change] Update sharetribe-scripts (CRA fork) to v2.1.8. There are a couple of changes that you
  should check from [#1073](https://github.com/sharetribe/flex-template-web/pull/1073)
  - package.json has now a "browserlist" configuration key. This gives you an option to affect
    Autoprefixer configs (aka CSS vendor prefixes / browser support). You might want to update it.
  - IE support is removed from Create React App, but you can add polyfills yourself if needed.
  - Test snapshots were also changed a bit. (Update your own custom tests if needed.)
  - Some CSS and React rules were more strict, you might need to make changes to your custom code.
- [fix] New npm vulnerability alerts checked and added to exception list.
  [#1075](https://github.com/sharetribe/flex-template-web/pull/1075)
- [fix] ListingPage.duck: fix minor bug on dispatching the fetchReviewsRequest action
  [#1074](https://github.com/sharetribe/flex-template-web/pull/1074)

  [v2.16.0]: https://github.com/sharetribe/flex-template-web/compare/v2.15.0...v2.16.0

## [v2.15.0] 2019-04-24

- [add] Improve printing API errors on web inspector (console.table)
  [#1071](https://github.com/sharetribe/flex-template-web/pull/1071)
- [fix] ManageAvailabilityCalendar.js didn't use UTC time when fetching data for calendar months.
  [#1069](https://github.com/sharetribe/flex-template-web/pull/1069)
- [add] Use sparse fields on InboxPage query to reduce data load.
  [#1067](https://github.com/sharetribe/flex-template-web/pull/1067)
  - NOTE: if you need more fields on `InboxPage`, you need to add those to `loadData` function.
- [add] Use sparse fields on SearchPage to reduce data load.
  [#1066](https://github.com/sharetribe/flex-template-web/pull/1066)

  - NOTE: if you need more fields on `ListingCard` than title, price and geolocation - you need to
    add those to `loadData` function.

  [v2.15.0]: https://github.com/sharetribe/flex-template-web/compare/v2.14.0...v2.15.0

## [v2.14.0] 2019-04-05

- [add] German translations for recent PayoutDetailsForm changes.
  [#1064](https://github.com/sharetribe/flex-template-web/pull/1064)
- [add] Added NZD and HKD subunit divisors and refactored currency configuration.
  [#1063](https://github.com/sharetribe/flex-template-web/pull/1063)
- [add] Add support for arbitrary line items.
  [#1062](https://github.com/sharetribe/flex-template-web/pull/1062)
- [fix] US individual accounts had a non-editable business url in PayoutDetailsForm. It was probably
  OK, but there wasn't any reason to for it.
  [#1061](https://github.com/sharetribe/flex-template-web/pull/1061)

  [v2.14.0]: https://github.com/sharetribe/flex-template-web/compare/v2.13.1...v2.14.0

## [v2.13.1] 2019-03-29

- [add] a comment about category and amenities filters. They don't work out-of-the-box, extended
  data needs a schema before it can work as a search filter.
  [#1055](https://github.com/sharetribe/flex-template-web/pull/1055)
- [fix] EditListingWizard: currentUser was null when the EditListingPage got reloaded causing
  TypeError. [#1056](https://github.com/sharetribe/flex-template-web/pull/1056)

  [v2.13.1]: https://github.com/sharetribe/flex-template-web/compare/v2.13.0...v2.13.1

## [v2.13.0] 2019-03-28

- [add] Add translations for recent Stripe API related changes. (German will be included later.)
  [#1052](https://github.com/sharetribe/flex-template-web/pull/1052)
- [fix] JPY currency was configured wrongly: it doesn't use subunits.
  [#1051](https://github.com/sharetribe/flex-template-web/pull/1051)
- [add] Complete rewrite to `PayoutDetailsForm` due to breaking changes in Stripe API.
  [#1049](https://github.com/sharetribe/flex-template-web/pull/1049)
  - You should track all your customizations to `PayoutDetailsForm` and related changes in
    `user.duck.js` and elsewhere before merging this upstream-update.
  - You should update Stripe API to "2019-02-19" or later
- [add] Booking: use attributes `displayStart` and `displayEnd`, instead of reading booking period
  directly from `start` and `end` attributes.
  [#1050](https://github.com/sharetribe/flex-template-web/pull/1050)
- [fix] A listing title that contained only stripped-off characters caused bugs in slug / pathName
  generation. [#1048](https://github.com/sharetribe/flex-template-web/pull/1048)
- [change] Removed Node-engine setup from package.json. Fixed version was causing problems for quite
  many in their first FTW installation. Note: when troubleshooting your Heroku installation, you
  might want to reintroduce engine setup.
  [#1043](https://github.com/sharetribe/flex-template-web/pull/1043)
- [fix] Add error handling to `PayoutDetailsForm` and `StripePaymentForm` in case Stripe publishable
  key is not configured yet. [#1042](https://github.com/sharetribe/flex-template-web/pull/1042)
- [fix] FieldBirthdayInput: placeholder text was not selected by default.
  [#1039](https://github.com/sharetribe/flex-template-web/pull/1039)

  [v2.13.0]: https://github.com/sharetribe/flex-template-web/compare/v2.12.1...v2.13.0

## [v2.12.0] 2019-02-28

- [fix] Fix to PR [#1035](https://github.com/sharetribe/flex-template-web/pull/1035). In
  `user.duck.js` send correct params depending on Stripe API in use.
  [#1037](https://github.com/sharetribe/flex-template-web/pull/1037)
- [change] Update creating Stripe account token to support the latest Stripe API update. See also
  [Stripe API changelog](https://stripe.com/docs/upgrades#api-changelog). **IMPORTANT:** If you are
  using a Stripe account created earlier than 19th of February 2019 you need to change the value of
  `useDeprecatedLegalEntityWithStripe` in `stripe-config.js`. You can check the Stripe API version
  you are using from Stripe Dashboard -> Developers. Since the change in Stripe API was quite big we
  are not able to support company accounts with new Stripe API yet! The option for company accounts
  will be hidden if the value `useDeprecatedLegalEntityWithStripe` is set to `false`.
  [#1035](https://github.com/sharetribe/flex-template-web/pull/1035)
- [change] Improve German translations.
  [#1034](https://github.com/sharetribe/flex-template-web/pull/1034)
- [change] Reordered import/exports on src/components/index.js. This helps to mitigate possible
  circular dependency problems and strange bugs in CSS bundle. In addition, derivative buttons were
  refactored to work with `rootClassName` prop (PrimaryButton, SecondaryButton and
  InlineTextButton). [#1024](https://github.com/sharetribe/flex-template-web/pull/1024)

  [v2.12.0]: https://github.com/sharetribe/flex-template-web/compare/v2.11.1...v2.12.0

## [v2.11.1] 2019-02-21

- [add] New translations for French and Spanish (fr.json & es.json)
  [#1028](https://github.com/sharetribe/flex-template-web/pull/1028)
- [add] New translation file German (de.json). This also adds hyphenation to some of the titles.
  [#1027](https://github.com/sharetribe/flex-template-web/pull/1027)

  [v2.11.0]: https://github.com/sharetribe/flex-template-web/compare/v2.11.0...v2.11.1

## [v2.11.0] 2019-02-20

- [fix] SelectMultipleFilter had a bug on mobile layout - `onSubmit` didn't get called. This fixes
  also two other issues with SelectMultipleFilter: hovering on ListingCard removed dirty values on
  repaint and there was an outline flashing on FilterForm when clicking checkboxes.
  [#1025](https://github.com/sharetribe/flex-template-web/pull/1025)
- [fix] Small changes in CSS files in order to match content width with the footer in pages where
  the footer is visible. Also, make side layout (used e.g. in `TermsOfServicePage`, `InboxPage`,
  `ContactDetailsPage`) align width footer better. Check responsive layouts carefulle after taking
  update from upstream. [#1090](https://github.com/sharetribe/flex-template-web/pull/1019)
- [add] This adds an example how user-generated content could be sanitized. If you have extended
  data you should consider if sanitization is needed for that.
  [#1023](https://github.com/sharetribe/flex-template-web/pull/1023)
- [change] A new component `UserDisplayName` is added for showing user display name and also
  handling the cases where a user is banned or deleted. When the user name must be a string instead
  of a component (e.g. in `Avatar` and in `ListingPage`) you can use a new function
  `userDisplayNameAsString`. Together these will replace the old `userDisplayName` function which is
  now deprecated. Also some small bug fixes to showing banned user. There is quite a lot of file
  changes caused by updating test files.
  [#1022](https://github.com/sharetribe/flex-template-web/pull/1022)
- [change] Remove error handling for unverified email from PasswordRecoveryPage and translations
  related to that. [#1021](https://github.com/sharetribe/flex-template-web/pull/1021)

  [v2.11.0]: https://github.com/sharetribe/flex-template-web/compare/v2.10.0...v2.11.0

## [v2.10.0] 2019-01-31

- [add] Add audit script and include it as a CI job. We had security audit job previously on top of
  node security platform (nsp), but that service was closed on December 2018.
  [#1020](https://github.com/sharetribe/flex-template-web/pull/1020)
- [change] Extracted and refactored utility functions related to transaction and refactored several
  components that show transaction data (incl. InboxPage, TransactionPanel, ActivityFeed). Before
  updating your customization project, you should read more about what has changed from the pull
  request. [#1004](https://github.com/sharetribe/flex-template-web/pull/1004)
- [change] Rest of the documentation moved to Flex Docs: https://www.sharetribe.com/docs/
  [#1015](https://github.com/sharetribe/flex-template-web/pull/1015)

  [v2.10.0]: https://github.com/sharetribe/flex-template-web/compare/v2.9.0...v2.10.0

## [v2.9.0] 2019-01-29

- [fix] day boundaries for date filter and pass booking state to bookings.query
  - SearchPage.duck.js: endDate should not be expanded for night bookings
  - DateRangeController: bookingUnitType: day should allow 0 night
  - EditListingPage.duck.js booking state should be passed to query
    [#1016](https://github.com/sharetribe/flex-template-web/pull/1016)
- [add] Date filter added and filter components (single and multiselect) are refactored to use
  shared subcomponents. [#949](https://github.com/sharetribe/flex-template-web/pull/949)
- [fix] Fixed copy-text in ReviewForm: Rating is required.
  [#1011](https://github.com/sharetribe/flex-template-web/pull/1011)
- [change] Some of the documentation moved to Flex Docs: https://www.sharetribe.com/docs/
  [#1012](https://github.com/sharetribe/flex-template-web/pull/1012) and
  [#1014](https://github.com/sharetribe/flex-template-web/pull/1014)
- [fix] Allow ownListing as listing proptype in BookingPanel component.
  [#1007](https://github.com/sharetribe/flex-template-web/pull/1007)
- [add] Add info text about additional owners to `PayoutDetailsForm`.
  [#1006](https://github.com/sharetribe/flex-template-web/pull/1006)
- [change] Default to English translation if the translation key is missing. After this update, new
  translation keys will not be added to other translation files with English default texts. We keep
  providing translations in our supported languages but they might not be up to date all the time.
  This means if you want to update your translations beforehand or use your own translations file,
  you can use
  [translation CLI](https://github.com/sharetribe/flex-template-web/blob/master/docs/translations.md#managing-translations)
  to check if there are translations missing.
  [#1005](https://github.com/sharetribe/flex-template-web/pull/1005)
- [change] Remove `origin` parameter from `default-location-searches.js`
  [#1003](https://github.com/sharetribe/flex-template-web/pull/1003)
- [add] Limit location autocomplete by adding an optional country parameter to geocoding call in
  both Mapbox and Google Maps integrations. Also updated Mapbox SDK to version 0.5.0.
  [#1002](https://github.com/sharetribe/flex-template-web/pull/1002)

  [v2.9.0]: https://github.com/sharetribe/flex-template-web/compare/v2.8.0...v2.9.0

## [v2.8.0] 2019-01-17

- [add] Add CLI tool for creating .env file and setting up the environment variables.
  [#994](https://github.com/sharetribe/flex-template-web/pull/994)
- [change] Change from Raven to Sentry SDKs for browser and Node.js to version 4.5.1. With the new
  SDKs only one DSN needs to be configured so update also environment variables and documentation
  related to Sentry. [#999](https://github.com/sharetribe/flex-template-web/pull/999)
- [fix] Use environment variable `REACT_APP_AVAILABILITY_ENABLED` to enable or disable availability
  calendar. In the config.js file variable fetchAvailableTimeSlots is now renamed to more general
  enableAvailability because it affects both fetching availability data and enabling the
  availability calendar. [#1000](https://github.com/sharetribe/flex-template-web/pull/1000)
- [fix] UI was broken for banned user after transaction enquiry changes.
  [#996](https://github.com/sharetribe/flex-template-web/pull/996)

  [v2.8.0]: https://github.com/sharetribe/flex-template-web/compare/v2.7.1...v2.8.0

## [v2.7.1] 2019-01-09

- [add] Separate date ranges when fetching availability exceptions and bookings on availability
  calendar. After this change, providers can block dates 365 days in advance instead of just 180
  days. [#997](https://github.com/sharetribe/flex-template-web/pull/997)
- [fix] Fixed a small typo. [#995](https://github.com/sharetribe/flex-template-web/pull/995)

  [v2.7.1]: https://github.com/sharetribe/flex-template-web/compare/v2.7.0...v2.7.1

## [v2.7.0] 2019-01-08

- [add] Add Spanish translations file: es.json and update docs/translations.md
  [#992](https://github.com/sharetribe/flex-template-web/pull/992)
- [add] Add French translations to new translations keys. Few minor updates to English translations
  for consistency. [#991](https://github.com/sharetribe/flex-template-web/pull/991)
- [add] Support for Stripe company accounts. `PayoutDetailsForm` was separated into smaller
  subcomponents. Multiple new translation keys were added and they might not be translated into
  French yet. [#980](https://github.com/sharetribe/flex-template-web/pull/980)
- Manage availability of listings. This works for listings that have booking unit type:
  'n', or 'd'. There's also 'manage availability' link in the
  ManageListingCards of "your listings" page.
  [#972](https://github.com/sharetribe/flex-template-web/pull/972)

  [v2.7.0]: https://github.com/sharetribe/flex-template-web/compare/v2.6.0...v2.7.0

## [v2.6.0] 2019-01-02

- [fix] Wrong translations for perUnit in fr.json.
  [#989](https://github.com/sharetribe/flex-template-web/pull/989)
- [change] Layout changes to BookingPanel on listing and transaction pages.
  [#988](https://github.com/sharetribe/flex-template-web/pull/988)
- [fix] Fix wrong booking title on listing page that has been introduced in #969.
  [#987](https://github.com/sharetribe/flex-template-web/pull/987)
- [fix] yarn.lock file was not up to date
  [#986](https://github.com/sharetribe/flex-template-web/pull/986)
- [add] Add an image of fork button to the deploy to production guide.
  [#985](https://github.com/sharetribe/flex-template-web/pull/985)
- [remove] Remove the default built-in email templates. Built-in email templates can be edited in
  Console. [#983](https://github.com/sharetribe/flex-template-web/pull/983)
- [add] Enable booking a listing straight from an enquiry
  [#976](https://github.com/sharetribe/flex-template-web/pull/976)
- [change] Extract SectionBooking to a distinct component from ListingPage.
  [#969](https://github.com/sharetribe/flex-template-web/pull/969)

  [v2.6.0]: https://github.com/sharetribe/flex-template-web/compare/v2.5.0...v2.6.0

## [v2.5.0] 2018-12-17

- [add] Add French translations to recently added translation keys. Also few minor changes to
  English translations for consistency.
  [#981](https://github.com/sharetribe/flex-template-web/pull/981)
- [add] Create FieldRadioButton component.
  [#977](https://github.com/sharetribe/flex-template-web/pull/977)
- [fix] Temporarily remove audit step from CI because of the Node Security Platform shutting down.
  [#979](https://github.com/sharetribe/flex-template-web/pull/979)
- [add] Add Stripe support for new countries: Canada, New Zealand, Switzerland, Norway, and Hong
  Kong. Also add more required fields for US and Australia.
  - StripeBankAccountTokenInputField component and PayoutDetailsForm have some changes
  - Stripe related configuration is separated to new stripe-config.js file.
  - Multiple new translation keys were added and they might not be translated into French yet. If
    you use French translation check PR for the changed keys.
    [#968](https://github.com/sharetribe/flex-template-web/pull/968)
- [change] Remove generic perUnit translations and replace them with specific night, day and unit
  translations depending on booking unit chosen in config.
  [#970](https://github.com/sharetribe/flex-template-web/pull/970)
- [fix] Formatting docs with newest Prettier - related commit was lost in #967 at some point.
  [#975](https://github.com/sharetribe/flex-template-web/pull/975)
- [change] Improved documents related to onboarding: env.md, deploying-to-production.md,
  map-providers.md [#971](https://github.com/sharetribe/flex-template-web/pull/971)
- [change] Update outdated dependencies.
  [#967](https://github.com/sharetribe/flex-template-web/pull/967)
  - **Note:** Updating Prettier caused multiple file changes mostly to `.md` files and `compose`
    setup.
- [change] Update supported Node version to the latest LTS (10.14).
  [#964](https://github.com/sharetribe/flex-template-web/pull/964)
- [add] Add documentation about deploying to production. Also add _deploy to Heroku_ button.
  [#961](https://github.com/sharetribe/flex-template-web/pull/961)

  [v2.5.0]: https://github.com/sharetribe/flex-template-web/compare/v2.4.1...v2.5.0

## [v2.4.1] 2018-11-29

- [fix] Add missing French translation.
  [#966](https://github.com/sharetribe/flex-template-web/pull/966)

[v2.4.1]: https://github.com/sharetribe/flex-template-web/compare/v2.4.0...v2.4.1

## [v2.4.0] 2018-11-28

- [change] Update Flex JS SDK to 1.2.
  [#963](https://github.com/sharetribe/flex-template-web/pull/963)
- [add] Add French as a default language in addition to English.
  [#962](https://github.com/sharetribe/flex-template-web/pull/962)
- [fix] Show Stripe error message on CheckoutPage if payment request fails because of Stripe error.
  Also show error if payment amount is zero.
  [#960](https://github.com/sharetribe/flex-template-web/pull/960)
- [fix] Remove unused translation keys and update PasswordChangePage title
  [#959](https://github.com/sharetribe/flex-template-web/pull/959)
- [add] Add translations CLI tool [#955](https://github.com/sharetribe/flex-template-web/pull/955)

[v2.4.0]: https://github.com/sharetribe/flex-template-web/compare/v2.3.2...v2.4.0

## [v2.3.2] 2018-11-20

- [fix] Take 2: don't set currentUserHasListings if fetched listing is in draft state.
  [#956](https://github.com/sharetribe/flex-template-web/pull/956)
- [fix] PriceFilter styles [#954](https://github.com/sharetribe/flex-template-web/pull/954)

[v2.3.2]: https://github.com/sharetribe/flex-template-web/compare/v2.3.1...v2.3.2

## [v2.3.1] 2018-11-16

- [fix] Don't set currentUserHasListings if fetched listing is in draft state.
  ModalMissingInformation was shown too early for users creating their first listing.
  [#953](https://github.com/sharetribe/flex-template-web/pull/953)
- [change] Add index files of components and containers folder to .prettierignore
  [#952](https://github.com/sharetribe/flex-template-web/pull/952)
- [fix] the alignment of arrows in FieldDateRangeInput and refactoring arrow icon code.
  [#951](https://github.com/sharetribe/flex-template-web/pull/951)
- [change] Remove unnecessary language configuration and improve translations documentation.
  [#950](https://github.com/sharetribe/flex-template-web/pull/950)

[v2.3.1]: https://github.com/sharetribe/flex-template-web/compare/v2.3.0...v2.3.1

## [v2.3.0] 2018-11-13

- [add] Draft listing is used in EditListingWizard, ManageListingCard and ListingPage. From now on
  description panel creates a draft listing and photos panel publishes it. You can also view your
  current draft listings from 'your listings' page.
  [#947](https://github.com/sharetribe/flex-template-web/pull/947)
- [fix] Firefox showed select options with the same color as select itself. Now options have their
  own color set and _placeholder option needs to be disabled_.
  [#946](https://github.com/sharetribe/flex-template-web/pull/946)

[v2.3.0]: https://github.com/sharetribe/flex-template-web/compare/v2.2.0...v2.3.0

## [v2.2.0] 2018-10-31

- [add] SearchPage: adds PriceFilter (and RangeSlider, FieldRangeSlider, PriceFilterForm).

  **Note:** You must define min and max for the filter in `src/marketplace-custom-config.js`.
  Current maximum value for the range is set to 1000 (USD/EUR/currency units). In addition, this
  fixes or removes component examples that don't work in StyleguidePage.

  [#944](https://github.com/sharetribe/flex-template-web/pull/944)

  [v2.2.0]: https://github.com/sharetribe/flex-template-web/compare/v2.1.1...v2.2.0

## [v2.1.1] 2018-10-23

- [add] Added initial documentation about routing and loading data.
  [#941](https://github.com/sharetribe/flex-template-web/pull/941)
- [remove] Removed plain text parts of email templates.
  [#942](https://github.com/sharetribe/flex-template-web/pull/942)
- [add] Add referrer policy due tokens in URL on PasswordResetPage and EmailVerificationPage.
  [#940](https://github.com/sharetribe/flex-template-web/pull/940)
- [add] Added initial documentation about our Redux setup.
  [#939](https://github.com/sharetribe/flex-template-web/pull/939)
- [add] Added a small comment to documentation about the current state of code-splitting.
  [#938](https://github.com/sharetribe/flex-template-web/pull/938)

[v2.1.1]: https://github.com/sharetribe/flex-template-web/compare/v2.1.0...v2.1.1

## [v2.1.0] 2018-10-01

- [change] Improve performance of public pages. Image assets are optimized and lazy loading is
  applied to images in SectionLocation and ListingCard. Read
  [documentation](./docs/improving-performance.md) for implementation details.
  [#936](https://github.com/sharetribe/flex-template-web/pull/936)
- [change] Update sharetribe-scripts. **cssnext** (used previously in sharetribe-scripts) has been
  deprecated. Now **postcss-preset-env** is used instead with stage 3 + custom media queries and
  nesting-rules. If this change breaks your styling, you could still use v1.1.2. The next version of
  [postcss-nesting](https://github.com/jonathantneal/postcss-nesting) (v7.0.0) will no longer
  support nested at-rules (like media queries) - therefore, we didn't update to that version yet.
  [#935](https://github.com/sharetribe/flex-template-web/pull/935)
- [change] Change Mapbox's default font to marketplace font.
  [#934](https://github.com/sharetribe/flex-template-web/pull/934)
- [add] New default design for the landing page's hero section. Now the CTA button's default
  behavior is 'Browse'.
  - `marketplaceH1FontStyles`: changed letter spacing to be more tight.
  - `SectionHero` has now a search page link that should be customized to point to your marketplace
    primary area [#933](https://github.com/sharetribe/flex-template-web/pull/933)

[v2.1.0]: https://github.com/sharetribe/flex-template-web/compare/v2.0.0...v2.1.0

## [v2.0.0] 2018-09-19

- [add] New default map provider (Mapbox) and complete refactoring to all map and geocoding
  components. [#888](https://github.com/sharetribe/flex-template-web/pull/888)

  **Note:** Before updating to version 2.0.0, you should very carefully track customizations that
  you have made to following components:

  - **LocationAutocompleteInput**
  - **Map**
  - **SearchPage** (especially previous `onIdle` function)
  - **SearchMap**
  - **SearchMapPriceLabel**
  - **SearchMapGroupLabel**
  - **SearchMapInfoCard**

  To get a better understanding of what has changed, you should read documents about how to
  [integrate to map providers](./docs/map-providers.md) and especially
  [changing map provider to Google Maps](./docs/google-maps.md)

[v2.0.0]: https://github.com/sharetribe/flex-template-web/compare/v1.4.3...v2.0.0

## [v1.4.3] 2018-09-15

- [fix] fuzzy location didn't change when listing location changed.
  [#931](https://github.com/sharetribe/flex-template-web/pull/931)
- [fix] obfuscatedCoordinatesImpl didn't always return coordinates within given offset radius.
  [#930](https://github.com/sharetribe/flex-template-web/pull/930)
- [fix] LocationAutocompleteInput: blur input when selecting by enter to prevent flash of default
  predictions. [#928](https://github.com/sharetribe/flex-template-web/pull/928)
- [fix] LocationAutocompleteInput: selecting with enter key prevented while fetching predictions.
  [#923](https://github.com/sharetribe/flex-template-web/pull/923)

[v1.4.3]: https://github.com/sharetribe/flex-template-web/compare/v1.4.2...v1.4.3

## [v1.4.2] 2018-09-06

- [add] Reduce character queries on LocationAutocompleteInput to reduce geocoding costs.
  [#883](https://github.com/sharetribe/flex-template-web/pull/883)
- [change] Update git links and improve documentation
  [#911](https://github.com/sharetribe/flex-template-web/pull/911)
- [change] improve env-template to better defaults.
  [#912](https://github.com/sharetribe/flex-template-web/pull/912)
- [fix] Touch event from location autocomplete prediction list ended up causing clicks.
  [#917](https://github.com/sharetribe/flex-template-web/pull/917)
- [change] Disable default predictions in listing wizard
  [#906](https://github.com/sharetribe/flex-template-web/pull/906)

[v1.4.2]: https://github.com/sharetribe/flex-template-web/compare/v1.4.1...v1.4.2

## [v1.4.1] 2018-08-21

- [fix] Fix window resize redirecting to search page with reusable map component
  [#905](https://github.com/sharetribe/flex-template-web/pull/905)

- [change] Maps configuration has been restructured. The new configuration is agnostic of the maps
  provider in use and works with both Google Maps as well as Mapbox.

  The fuzzy location circle has less configuration, but otherwise all the previous settings can be
  set also in the new configuration. See `config.js` for details.

  The default location searches are now enabled in the `.env-template`. For old installations, the
  `REACT_APP_DEFAULT_SEARCHES_ENABLED` env var should be set to `true`. The default searches can
  then be configured in `src/default-location-searches.js`.

  [#900](https://github.com/sharetribe/flex-template-web/pull/900)

[v1.4.1]: https://github.com/sharetribe/flex-template-web/compare/v1.4.0...v1.4.1

## [v1.4.0] 2018-08-17

- [change] Put availability calendar behind a feature flag
  [#902](https://github.com/sharetribe/flex-template-web/pull/902)
- [fix] Drop date time from time slots request query params
  [#901](https://github.com/sharetribe/flex-template-web/pull/901)
- [fix] Make a second time slots request when required
  [#901](https://github.com/sharetribe/flex-template-web/pull/901)
- [add] Map component (used in ListingPage) using Mapbox instead of Google Maps
  [#896](https://github.com/sharetribe/flex-template-web/pull/896)
- [add] Listing availability [#868](https://github.com/sharetribe/flex-template-web/pull/868),
  [#873](https://github.com/sharetribe/flex-template-web/pull/873),
  [#891](https://github.com/sharetribe/flex-template-web/pull/891) &
  [#892](https://github.com/sharetribe/flex-template-web/pull/892)
- [add] Add support for user's current location as a default suggestion in the location autocomplete
  search. [#895](https://github.com/sharetribe/flex-template-web/pull/895)
- [add] Add support for default locations in the LocationAutocompleteInput component. Common
  searches can be configured to show when the input has focus. This reduces typing and Google Places
  geolocation API usage. The defaults can be configured in
  `src/components/LocationAutocompleteInput/GeocoderGoogleMaps.js`.
  [#894](https://github.com/sharetribe/flex-template-web/pull/894)
- [change] Removed the `country` parameter from the search page as it was not used anywhere.
  [#893](https://github.com/sharetribe/flex-template-web/pull/893)

[v1.4.0]: https://github.com/sharetribe/flex-template-web/compare/v1.3.2...v1.4.0

## [v1.3.2] 2018-08-07

- [change] Update the Sharetribe Flex SDK to the 1.0.0 version in NPM. All the `sharetribe-sdk`
  imports are now using the new package name `sharetribe-flex-sdk`.
  [#884](https://github.com/sharetribe/flex-template-web/pull/884)
- [change] Reusable SearchMap. Fixed the original reverted version. (Includes audit exception 678)
  [#882](https://github.com/sharetribe/flex-template-web/pull/882)

[v1.3.2]: https://github.com/sharetribe/flex-template-web/compare/v1.3.1...v1.3.2

## [v1.3.1]

- [fix] Hotfix: reverting the usage of ReusableMapContainer due to production build error.
  [#881](https://github.com/sharetribe/flex-template-web/pull/881)

[v1.3.1]: https://github.com/sharetribe/flex-template-web/compare/v1.3.0...v1.3.1

## [v1.3.0]

- [change] Reusable SearchMap. [#877](https://github.com/sharetribe/flex-template-web/pull/877)
- [fix] Fix a search filters panel bug where selecting an option in a multi select filter ends up
  invoking a mobile filter callback function.
  [#876](https://github.com/sharetribe/flex-template-web/pull/876)
- [change] Use seeded random for client side coordinate obfuscation
  [#874](https://github.com/sharetribe/flex-template-web/pull/874)

[v1.3.0]: https://github.com/sharetribe/flex-template-web/compare/v1.2.2...v1.3.0

## [v1.2.2]

- [change] Change static map to dynamic map when clicked.
  [#871](https://github.com/sharetribe/flex-template-web/pull/871)

[v1.2.2]: https://github.com/sharetribe/flex-template-web/compare/v1.2.1...v1.2.2

## [v1.2.1]

- [fix] Lazy load map only if the map is near current viewport.
  [#871](https://github.com/sharetribe/flex-template-web/pull/871)

[v1.2.1]: https://github.com/sharetribe/flex-template-web/compare/v1.2.0...v1.2.1

## [v1.2.0]

- [change] Use Google's static map on ListingPage. This is a reaction to pricing change of Google
  Maps APIs. [#869](https://github.com/sharetribe/flex-template-web/pull/869)
- [change] Use sessionTokens and fields for Autocomplete calls to Google Maps. This is a reaction to
  pricing change of Google Maps APIs.
  [#867](https://github.com/sharetribe/flex-template-web/pull/867)
- [change] Change TransactionPage state management in loadData.
  [#863](https://github.com/sharetribe/flex-template-web/pull/863),
  [#865](https://github.com/sharetribe/flex-template-web/pull/865) &
  [#866](https://github.com/sharetribe/flex-template-web/pull/866)
- [fix] Fix submit button state on contact details page.
  [#864](https://github.com/sharetribe/flex-template-web/pull/864)
- [fix] Fix listing page host section layout bug.
  [#862](https://github.com/sharetribe/flex-template-web/pull/862)
- [fix] Fix initial message input clearing too early in checkout page.
  [#861](https://github.com/sharetribe/flex-template-web/pull/861)
- [fix] Fix setting Topbar search input initial value.
- [change] Update Redux to v4 [#859](https://github.com/sharetribe/flex-template-web/pull/859)
- [fix] Fix setting Topbar search input initial value
  [#857](https://github.com/sharetribe/flex-template-web/pull/857)

[v1.2.0]: https://github.com/sharetribe/flex-template-web/compare/v1.1.0...v1.2.0

## [v1.1.0]

- [fix] Improve slug creation (slashes were breaking rendering in some environments)
  [#850](https://github.com/sharetribe/flex-template-web/pull/850)
- [fix] Anonymous user should see contact link on UserCard
  [#851](https://github.com/sharetribe/flex-template-web/pull/851)
- [fix] Persisting booking request details across authentication
  [#852](https://github.com/sharetribe/flex-template-web/pull/852)
- [change] Footer styles changed to more generic (no disappearing columns etc.) If you have made
  changes to Footer, consider extracting it to different component before update.
  [#853](https://github.com/sharetribe/flex-template-web/pull/853)
- [change] Logo customization refactored to be easier. Check CheckoutPage, TopbarDesktop and Footer
  after update. [#854](https://github.com/sharetribe/flex-template-web/pull/854)
- [fix] Fix showing reviews from banned users.
  [#855](https://github.com/sharetribe/flex-template-web/pull/855)

[v1.1.0]: https://github.com/sharetribe/flex-template-web/compare/v1.0.0...v1.1.0

## [v1.0.0]

- [change] Migrate remaining Redux Forms to Final Form. Also now all the form components can be
  found in the src/forms folder. Remove redux-form from the dependencies.
  [#845](https://github.com/sharetribe/flex-template-web/pull/845)
- [fix] Extract and fix missing information reminder modal from Topbar
  [#846](https://github.com/sharetribe/flex-template-web/pull/846)
- [fix] Add missing styles for ModalMissingInformation from Topbar
  [#847](https://github.com/sharetribe/flex-template-web/pull/847)
- [fix] API does not return all image variants anymore, this adds correct variants to update contact
  details call. [#848](https://github.com/sharetribe/flex-template-web/pull/848)

[v1.0.0]: https://github.com/sharetribe/flex-template-web/compare/v0.3.1...v1.0.0

## [v0.3.1]

- [change] Change lodash import syntax to reduce bundle size (-15.14 KB)
  [#839](https://github.com/sharetribe/flex-template-web/pull/839)
- [fix] Use https instead of git to access SDK repo for Heroku build (now that the repo is public).
  TODO: create SDK releases instead of using direct refs to single commit.
  [#841](https://github.com/sharetribe/flex-template-web/pull/841)
- [fix] Typo fix for background-color
  [#842](https://github.com/sharetribe/flex-template-web/pull/842)

[v0.3.1]: https://github.com/sharetribe/flex-template-web/compare/v0.3.0...v0.3.1

## [v0.3.0]

- Remove custom touched handling from `FieldCheckboxGroup` as it has has become obsolete now that
  Final Form is replacing Redux Form.
  [#837](https://github.com/sharetribe/flex-template-web/pull/837)
- Create Stripe account directly instead of passing payout details to Flex API (deprecated way).
  [#836](https://github.com/sharetribe/flex-template-web/pull/836)

[v0.3.0]: https://github.com/sharetribe/flex-template-web/compare/v0.2.0...v0.3.0

## v0.2.0

- Starting a change log for Flex Template for Web.
