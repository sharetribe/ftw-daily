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

## Upcoming version 2021-XX-XX
- [fix] Remove unnecessary language import: fr.json
  [#1469](https://github.com/sharetribe/ftw-daily/pull/1469)
- [fix] Font-size for Poppins font was too big for Stripe Elements on small screens.
  [#1465](https://github.com/sharetribe/ftw-daily/pull/1465)
- [change] Updates to some of the libraries. React Intl had a breaking change v3 -> v5.
  [#464](https://github.com/sharetribe/ftw-daily/pull/1464)
- [fix] Adblockers might block Google analytics (window.ga) and cause an error.
  [#1462](https://github.com/sharetribe/ftw-daily/pull/1462)

## [v8.2.0] 2021-08-06

- [change] Update lodash version number in package.json resolutions section.
  [#1459](https://github.com/sharetribe/ftw-daily/pull/1459)
- [change] Dependabot update: url-parse (v1.5.1)
  [#1436](https://github.com/sharetribe/ftw-daily/pull/1436)
- [change] Dependabot update: lodash (v4.17.21)
  [#1437](https://github.com/sharetribe/ftw-daily/pull/1437)
- [change] Dependabot update: tar (v4.4.15)
  [#1457](https://github.com/sharetribe/ftw-daily/pull/1457)
- [change] Dependabot update: ws (v6.2.2) [#1446](https://github.com/sharetribe/ftw-daily/pull/1446)
- [change] Dependabot update: hosted-git-info (v2.8.9)
  [#1438](https://github.com/sharetribe/ftw-daily/pull/1438)
- [change] Dependabot update: trim-newlines (v3.0.1)
  [#1449](https://github.com/sharetribe/ftw-daily/pull/1449)
- [change] Update sharetribe-scripts to version 5.0.1 which improves the instructions that are shown
  after running yarn build command. [#1458](https://github.com/sharetribe/ftw-daily/pull/1458)
- [fix] Remove unused dep-resolution: handlebars.
  [#1456](https://github.com/sharetribe/ftw-daily/pull/1456)
- [fix] PriceFilterPopup: filter popup is not closing when clicking outside on Safari.
  [#1455](https://github.com/sharetribe/ftw-daily/pull/1455)
- [fix] Add missing helper: isNumber. Used when Number.MAX_SAFE_INTEGER is reached.
  [#1453](https://github.com/sharetribe/ftw-daily/pull/1453)
- [fix] minutesBetween: remove thrown an error on negative diff.
  [#1444](https://github.com/sharetribe/ftw-daily/pull/1444)
- [fix] TransactionPanel: fix typo [#1451](https://github.com/sharetribe/ftw-daily/pull/1451)
- [fix] searchMode (has_all/has_any) disappeared, when search-by-moving-the-map was used.
  [#1443](https://github.com/sharetribe/ftw-daily/pull/1443)

  [v8.2.0]: https://github.com/sharetribe/ftw-daily/compare/v8.1.1...v8.2.0

## [v8.1.1] 2021-04-20

- [change] Update jose to v3.11.4 [#1433](https://github.com/sharetribe/ftw-daily/pull/1433)
- [add] Update fr.json, es.json and partially de.json
  [#1431](https://github.com/sharetribe/ftw-daily/pull/1431)
- [fix] currency conversion should not expect that env-variable is set.
  [#1425](https://github.com/sharetribe/ftw-daily/pull/1425)
- [fix] LoadableComponentErrorBoundary should be used in prod, not in dev-mode with
  hot-loading.[#1429](https://github.com/sharetribe/ftw-daily/pull/1429)
- [fix] currency for Poland (PLN) [#1427](https://github.com/sharetribe/ftw-daily/pull/1427)

  [v8.1.1]: https://github.com/sharetribe/ftw-daily/compare/v8.1.0...v8.1.1

## [v8.1.0] 2021-03-11

- [change] Specify required Node.js versions in package.json and update the node version used in
  CircleCI. Currently, the required Node.js version comes from
  [jose](https://github.com/panva/jose#runtime-support-matrix) package which is used with social
  logins. [#1418](https://github.com/sharetribe/ftw-daily/pull/1418)
- [fix] enforce upper case for currency and improve error message for it.
  [#1417](https://github.com/sharetribe/ftw-daily/pull/1417)
- [add] Add `LoadableComponentErrorBoundary` for handling ChunkLoadErrors with error boundary.
  [#1416](https://github.com/sharetribe/ftw-daily/pull/1416)

  [v8.1.0]: https://github.com/sharetribe/ftw-daily/compare/v8.0.0...v8.1.0

## [v8.0.0] 2021-02-17

This major release adds support for code-splitting using
[Loadable Components](https://loadable-components.com/). At this point, we added route-based code
splitting, which meant changes to routeConfiguration.js and how "loadData" & "setInitialValues"
functions are defined and passed to routeConfiguration. Read more from
[Flex Docs](https://www.sharetribe.com/docs/ftw-routing/how-code-splitting-works-in-ftw/) and
related pull requests:

- [fix] Remove unintended Lodash usage, unspecified window-scope calls and unused vars
  [#1413](https://github.com/sharetribe/ftw-daily/pull/1413)
- [add] Route-based code splitting. This is done against sharetribe-scripts v5.0.0 using Loadable
  components. Read more from the pull request.
  [#1411](https://github.com/sharetribe/ftw-daily/pull/1411)

  [v8.0.0]: https://github.com/sharetribe/ftw-daily/compare/v7.3.0...v8.0.0

## [v7.3.0] 2021-01-13

- [fix] Move well-known/\* endpoints related to OIDC proxy setup from `apiRouter` to new
  `wellKnownRouter`so that they can be enabled outside the basic auth setup. It also makes it
  simpler to set the identity provider url, because we can drop the `/api` part of the path. Also,
  rename the `RSA_SECRET_KEY`to `RSA_PRIVATE_KEY` for consistency.
  [#1399](https://github.com/sharetribe/ftw-daily/pull/1399)
- [fix] Make sure that the verify email API endpoint has been called successfully before redirecting
  the user away from EmailVerificationPage.
  [#1397](https://github.com/sharetribe/ftw-daily/pull/1397)

  [v7.3.0]: https://github.com/sharetribe/ftw-daily/compare/v7.2.0...v7.3.0

## [v7.2.0] 2020-12-16

- [add] Add helper functions for setting up your own OIDC authentication and using FTW server as
  proxy when needed. [#1383](https://github.com/sharetribe/ftw-daily/pull/1383)

  [v7.2.0]: https://github.com/sharetribe/ftw-daily/compare/v7.1.0...v7.2.0

## [v7.1.0] 2020-12-15

- [change] Handle entity update with sparse attributes.
  [#1392](https://github.com/sharetribe/ftw-daily/pull/1392)
- [change] Remove react-google-maps dependency. It has not been maintained for 3 years. From now on,
  we use Google Maps API directly. However, the default map provider is still Mapbox.
  [#1389](https://github.com/sharetribe/ftw-daily/pull/1389)
- [fix] Pass metadata through sanitizeUser function.
  [#1391](https://github.com/sharetribe/ftw-daily/pull/1391)
- [fix] Call for the same page caused unnecessary rendering
  [#1388](https://github.com/sharetribe/ftw-daily/pull/1388)
- [fix] Fix Google Maps default centering if no bounds or center is given.
  [#1386](https://github.com/sharetribe/ftw-daily/pull/1386)
- [add] Add timeout and other options for getCurrentLocation call.
  [#1385](https://github.com/sharetribe/ftw-daily/pull/1385)
- [fix] Fix FieldCheckbox validation on blur event on Firefox.
  [#1384](https://github.com/sharetribe/ftw-daily/pull/1384)

  [v7.1.0]: https://github.com/sharetribe/ftw-daily/compare/v7.0.0...v7.1.0

## [v7.0.0] 2020-11-17

This major release renames all the CSS files. If you have made custom components or customized
existing ones, you should read the related [PR](https://github.com/sharetribe/ftw-daily/pull/1374)
for more information.

- [change] Update sharetribe-scripts (our fork of create-react-app) to v4.0.0. In addition to
  changes that CRA@v4 brought along,

  - We started to use`*.module.css` naming pattern for styles that use CSS Modules preprocessor.
  - We also turned on live CSS Custom Properties (CSS Variables).

  Read the PR for more info: [#1374](https://github.com/sharetribe/ftw-daily/pull/1374)

  [v7.0.0]: https://github.com/sharetribe/ftw-daily/compare/v6.5.0...v7.0.0

## [v6.5.0] 2020-11-16

- [add] Add support for Google login. This works in the same way as Facebook flow so you can check
  the [Facebook PR](https://github.com/sharetribe/ftw-daily/pull/1364) for the more details.
  [#1376](https://github.com/sharetribe/ftw-daily/pull/1376)
- [fix] Routes component got double rendered due to Redux container HOC. Because navigation could
  happen twice, loadData was also called twice.
  [#1380](https://github.com/sharetribe/ftw-daily/pull/1380)
- [fix] 401 return code when rendering on SSR.
  [#1379](https://github.com/sharetribe/ftw-daily/pull/1379)

  [v6.5.0]: https://github.com/sharetribe/ftw-daily/compare/v6.4.2...v6.5.0

## [v6.4.2] 2020-10-30

- [fix] Fix the issue with form on AuthenticationPage not showing on smaller screens when using
  Safari as browser. [#1377](https://github.com/sharetribe/ftw-daily/pull/1377)

  [v6.4.2]: https://github.com/sharetribe/ftw-daily/compare/v6.4.1...v6.4.2

## [v6.4.1] 2020-10-20

- [add] Add new Stripe countires Bulgaria, Cyprus, Czech Republic, Malta and Romania to the
  `StripeConnectAccountForm`. Also reorder BANK_CODE & BRANCH_CODE in UI to more logical order.
  [#1371](https://github.com/sharetribe/ftw-daily/pull/1371)
- [fix] Don't pass protected data key through `ConfirmSignupForm` if protected data is empty.
  [#1370](https://github.com/sharetribe/ftw-daily/pull/1370)
- [add] Update French translation file (Spanish and German translations have still missing keys).
  [#1369](https://github.com/sharetribe/ftw-daily/pull/1369)
- [fix] Pass additional values from `ConfirmSignupForm` forward as user's protected data.
  [#1368](https://github.com/sharetribe/ftw-daily/pull/1368)

  [v6.4.1]: https://github.com/sharetribe/ftw-daily/compare/v6.4.0...v6.4.1

## [v6.4.0] 2020-10-14

- [add] Add Facebook login as a first step towards supporting social logins and SSO in FTW. This PR
  introduces new endpoints `createUserWithIdp` and `loginWithIdp` and strategy for logging in with
  Facebook. See the PR for the more detailed view of the changes.
  [#1364](https://github.com/sharetribe/ftw-daily/pull/1364)
- [fix] Fix missing proptype warnings in `TransactionPage` and `TransactionPanel` tests.
  [#1363](https://github.com/sharetribe/ftw-daily/pull/1363)
- [fix] Improve error handling by passing error details forward instead of creating a new error that
  hides the details when making API call to FTW server.
  [#1361](https://github.com/sharetribe/ftw-daily/pull/1361)
- [fix] Remove duplicate page schema from body.
  [#1355](https://github.com/sharetribe/ftw-daily/pull/1355)

  [v6.4.0]: https://github.com/sharetribe/ftw-daily/compare/v6.3.1...v6.4.0

## [v6.3.1] 2020-08-19

- [fix] Fix popup-button in SelectSingleFilterPopup.css and adjust Footer with correct baselines.
  [#1353](https://github.com/sharetribe/ftw-daily/pull/1353)

[v6.3.1]: https://github.com/sharetribe/ftw-daily/compare/v6.3.0...v6.3.1

## [v6.3.0] 2020-08-19

- [change] We decided to change the default font to Poppins.
  [#1349](https://github.com/sharetribe/ftw-daily/pull/1349)
- [change] Update path-to-regexp to v6.1.0
  [#1348](https://github.com/sharetribe/ftw-daily/pull/1348)
- [change] Update Helmet to v4.0.0. Show warning if environment variable REACT_APP_CSP is not set or
  if it's set to 'report' mode in production environmet. Set REACT_APP_CSP to 'report' mode by
  default in `.env-template` file. [#1347](https://github.com/sharetribe/ftw-daily/pull/1347)
- [change] In `StripeConnectAccountForm` show error message from Stripe if there is one when
  fetching account link. [#1346](https://github.com/sharetribe/ftw-daily/pull/1346)

[v6.3.0]: https://github.com/sharetribe/ftw-daily/compare/v6.2.0...v6.3.0

## [v6.2.0] 2020-08-12

This change set was originally released as a patch update 6.1.2 but after reconsideration it's
released as a minor update 6.2.0.

- [fix] remove typo [#1343](https://github.com/sharetribe/ftw-daily/pull/1343)
- [change] Request custom image variants for avatar
  [#1342](https://github.com/sharetribe/ftw-daily/pull/1342)
- [change] Some dependency updates [#1337](https://github.com/sharetribe/ftw-daily/pull/1337)
- [fix] Use Stripe's `confirmCardPayment` function instead of deprecated `handleCardPayment` to
  confirm PaymentIntent. In addition to the rename, the arguments passed to `handleCardPayment` are
  sligthly different. Otherwise, these changes should not affect the behavior of the function.
  [#1339](https://github.com/sharetribe/ftw-daily/pull/1339)

[v6.2.0]: https://github.com/sharetribe/flex-template-web/compare/v6.1.1...v6.2.0

## [v6.1.1] 2020-07-21

- [fix] Fix config script for NodeJS v14.5.0
  [#1327](https://github.com/sharetribe/ftw-daily/pull/1327)

[v6.1.1]: https://github.com/sharetribe/flex-template-web/compare/v6.1.0...v6.1.1

## [v6.1.0] 2020-07-01

- [fix] MainPanel: search filter bug. Address and bounds are handled outside of MainPanel, URL
  params should be trusted instead of values stored to state.
  [#1320](https://github.com/sharetribe/ftw-daily/pull/1320)
- [fix] small typo. [#1319](https://github.com/sharetribe/ftw-daily/pull/1319)
- [fix] Fix typo (which is copy-pasted in 4 files).
  [#1318](https://github.com/sharetribe/ftw-daily/pull/1318)
- [add] Update French translation file (Spanish and German translations have still missing keys).
  [#1316](https://github.com/sharetribe/ftw-daily/pull/1316)
- [fix] Sync bookingUnitType variables and update comments. Client app's API (proxy) server needs to
  know about unit type. [#1317](https://github.com/sharetribe/ftw-daily/pull/1317)

[v6.1.0]: https://github.com/sharetribe/flex-template-web/compare/v6.0.0...v6.1.0

## [v6.0.0] 2020-06-25

- [change] Use privileged transitions for price calculation by default and update the process alias.
  [#1314](https://github.com/sharetribe/ftw-daily/pull/1314)
- [add] Add client secret enquiry to 'yarn run config' script
  [#1313](https://github.com/sharetribe/ftw-daily/pull/1313)
- [change] Add UI support for flexible pricing and privileged transitions. Note that this requires
  updating the booking breakdown estimation code that is now done in the backend.
  [#1310](https://github.com/sharetribe/ftw-daily/pull/1310)
- [add] Add local API endpoints for flexible pricing and privileged transitions
  [#1301](https://github.com/sharetribe/ftw-daily/pull/1301)
- [fix] `yarn run dev-backend` was expecting NODE_ENV.
  [#1303](https://github.com/sharetribe/ftw-daily/pull/1303)

[v6.0.0]: https://github.com/sharetribe/flex-template-web/compare/v5.0.0...v6.0.0

## [v5.0.0] 2020-06-04

- [change] Streamlining filter setup. Everyone who customizes FTW-templates, needs to update filters
  and unfortunately the related code has been spread out in multiple UI containers.

  Now, filters are more configurable through marketplace-custom-config.js. You can just add new
  filter configs to `filters` array in there - and that should be enough for creating new filters
  for extended data.

  If your are creating a totally new filter component, you can take it into use in a single file:
  src/containers/SearchPage/FilterComponent.js

  In addition, we have renamed couple of container components:

  - SearchFilters -> SearchFiltersPrimary
  - SearchFiltersPanel -> SearchFiltersSecondary (SearchFiltersMobile has kept its name.)

  SortBy filter's state is also tracked similarly as filters. From now on, the state is kept in
  MainPanel and not in those 3 different UI containers.

  [#1296](https://github.com/sharetribe/ftw-daily/pull/1296)

[v5.0.0]: https://github.com/sharetribe/flex-template-web/compare/v4.5.0...v5.0.0

## [v4.5.0] 2020-06-01

- [fix] In some situations, ProfileMenu has began to overflow on TopbarDesktop.
  [#1290](https://github.com/sharetribe/ftw-daily/pull/1290)
- [change] Update dependencies (patch updates only)
  [#1291](https://github.com/sharetribe/ftw-daily/pull/1291)
- [change] Refactor server API routes into separate files.
  [#1294](https://github.com/sharetribe/ftw-daily/pull/1294)
- [change] Start the backend API router in dev mode with a dev server.
  [#1297](https://github.com/sharetribe/ftw-daily/pull/1297)

[v4.5.0]: https://github.com/sharetribe/flex-template-web/compare/v4.4.3...v4.5.0

## [v4.4.3] 2020-05-13

- [fix] Allow white space on Japanese bank account info. Japan collects bank name and account owner
  name in addition to routing numbers. [#1287](https://github.com/sharetribe/ftw-daily/pull/1287)
- [fix] wrongly named default props handleSubmit renamed to onSubmit
  [#1288](https://github.com/sharetribe/ftw-daily/pull/1288)

[v4.4.3]: https://github.com/sharetribe/flex-template-web/compare/v4.4.2...v4.4.3

## [v4.4.2] 2020-04-09

- [fix] Handle deleted reviews in ActivityFeed
  [#1283](https://github.com/sharetribe/ftw-daily/pull/1283)

[v4.4.2]: https://github.com/sharetribe/flex-template-web/compare/v4.4.1...v4.4.2

## [v4.4.1] 2020-03-30

- [change] Improve the search page sorting and filters UI for different screen sizes
  [#1280](https://github.com/sharetribe/ftw-daily/pull/1280)

[v4.4.1]: https://github.com/sharetribe/flex-template-web/compare/v4.4.0...v4.4.1

## [v4.4.0] 2020-03-25

- [add] Search result sorting [#1277](https://github.com/sharetribe/ftw-daily/pull/1277)
- [change] Move category and amenities search filters from primary filters to secondary filters.
  [#1275](https://github.com/sharetribe/ftw-daily/pull/1275)

[v4.4.0]: https://github.com/sharetribe/flex-template-web/compare/v4.3.0...v4.4.0

## [v4.3.0] 2020-03-16

- [change] Redirect user back to Stripe during Connect Onboarding Flow when user is returned to
  failure URL provided that the Account Link generation is successful.
  [#1269](https://github.com/sharetribe/ftw-daily/pull/1269)
- [fix] Don't flash listing closed text on mobile view of `BookingPanel` when the listing data is
  not loaded yet. Instead, check that text is shown only for closed listings.
  [#1268](https://github.com/sharetribe/ftw-daily/pull/1268)
- [change] Use some default values to improve Stripe Connect onboarding. When creating a new Stripe
  the account we will pass the account type, business URL and MCC to Stripe in order to avoid a
  couple of steps in Connect Onboarding. We will also pass `tos_shown_and_accepted` flag. This PR
  will bring back the previously used `accountToken` which is now used for passing e.g. the account
  type to Stripe. [#1267](https://github.com/sharetribe/ftw-daily/pull/1267)
- [change] Update `Modal` component to have option to use `Portal` with `usePortal` flag. Keep also
  possibility to use modals without Portal because of `ModalInMobile` component.
  [#1258](https://github.com/sharetribe/ftw-daily/pull/1258)

  [v4.3.0]: https://github.com/sharetribe/flex-template-web/compare/v4.2.0...v4.3.0

## [v4.2.0] 2020-02-18

- [add] Show a banner when a user is logged in with limited access.
  [#1259](https://github.com/sharetribe/ftw-daily/pull/1259)
  [#1261](https://github.com/sharetribe/ftw-daily/pull/1261)
- [add] Support for logging in as a user from Console.
  [#1254](https://github.com/sharetribe/ftw-daily/pull/1254)
- [change] Add `handlebars` 4.5.3 and `serialize-javascript` 2.1.1 to resolutions in `package.json`.
  [#1251](https://github.com/sharetribe/ftw-daily/pull/1251)

  [v4.2.0]: https://github.com/sharetribe/flex-template-web/compare/v4.1.0...v4.2.0

## [v4.1.0] 2020-02-03

- [fix] Remove unused 'invalid' prop that breaks some versions of Final Form
  [#1255](https://github.com/sharetribe/ftw-daily/pull/1255)
- [fix] Fix `console.warn` functions. [#1252](https://github.com/sharetribe/ftw-daily/pull/1252)
- [add] Add missing countries (e.g. MX and JP) to `StripeBankAccountTokenInput` validations.
  [#1250](https://github.com/sharetribe/ftw-daily/pull/1250)

  [v4.0.1]: https://github.com/sharetribe/flex-template-web/compare/v4.0.0...v4.1.0

## [v4.0.0] 2019-12-19

- [change] Use Stripe's [Connect onboarding](https://stripe.com/docs/connect/connect-onboarding) for
  adding and updating the identity information of the Stripe account.
  - Before updating to this version you should check
    [the related pull request](https://github.com/sharetribe/ftw-daily/pull/1234)
  - Read more from documentation:
    [How to handle provider onboarding and identity verification on FTW](https://www.sharetribe.com/docs/guides/provider-onboarding-and-identity-verification/)

**Note:** In this update we have deprecated the old `PayoutDetailsForm` and `PayoutPreferencesPage`.
Form now on Stripe will handle collecting the identity information required for verificating the
Stripe account. On FTW we will only handle creating the new account and adding and updating
information about bank account (e.g. IBAN number). If you want to keep using the custom form inside
your application you need to make sure that you are collecting all the required information and
enabling users to update the account so that it doesn't get restricted.

- [fix] Add missing props to examples related to EditListingWizard
  [#1247](https://github.com/sharetribe/ftw-daily/pull/1247)
- [fix] Add missing props to tests related to EditListingWizard
  [#1246](https://github.com/sharetribe/ftw-daily/pull/1246)
- [fix] Update links to API Reference docs.
  [#1231](https://github.com/sharetribe/ftw-daily/pull/1231)

  [v4.0.0]: https://github.com/sharetribe/flex-template-web/compare/v3.7.0...v4.0.0

## [v3.7.0] 2019-12-09

- [change] Make it easier to reorder EditListingWizard tabs/panels.
  [#1240](https://github.com/sharetribe/ftw-daily/pull/1240)
- [change] In `PayoutDetailsForm` show states (US and AU) and provinces (CA) in dropdown instead of
  input. Since November 18, 2019 Stripe has been validating these values (read more
  https://support.stripe.com/questions/connect-address-validation).
- [add] Add IconEdit [#1237](https://github.com/sharetribe/ftw-daily/pull/1237)

  [v3.7.0]: https://github.com/sharetribe/flex-template-web/compare/v3.6.1...v3.7.0

## [v3.6.1] 2019-11-26

- [fix] Fix XSS-vulnerability on SearchPage where URL param 'address' was exposed directly to
  schema, which is just a script tag: <script type="application/ld+json">. On server-side, this
  could leak malformed HTML through to browsers and made it possible to inject own script tags.

However, CSP prevents any data breach: injected js can't send data to unknonwn 3rd party sites.

NOTE: Check that `REACT_APP_CSP` is in block mode on your production environment. You can read more
from Flex docs: https://www.sharetribe.com/docs/guides/how-to-set-up-csp-for-ftw/
[#1233](https://github.com/sharetribe/flex-template-web/pull/1233)

- [change] Rename repository form `flex-template-web` to `ftw-daily`.
  [#1230](https://github.com/sharetribe/flex-template-web/pull/1230)

  [v3.6.1]: https://github.com/sharetribe/flex-template-web/compare/v3.6.0...v3.6.1

## [v3.6.0] 2019-11-04

- [change] update react-dates from 20.3.0 to 21.3.1
  [#1223](https://github.com/sharetribe/flex-template-web/pull/1223)
- [change] Update helmet from 3.18.0 to 3.21.2
  [#1225](https://github.com/sharetribe/flex-template-web/pull/1225)
- [change] Update @sentry/browser and @sentry/node from 5.6.2 to 5.7.1. Due to some refactoring
  Sentry has done internally which is included to this update, you might need to remove
  `node_modules` and run `yarn install` again.
  [#1224](https://github.com/sharetribe/flex-template-web/pull/1224)
- [add] Add default timezone to date formatting in example transaction process email templates.
  [#1227](https://github.com/sharetribe/flex-template-web/pull/1227)
- [change] Update @formatjs/intl-relativetimeformat from 2.8.3 to 4.2.1
  [#1222](https://github.com/sharetribe/flex-template-web/pull/1222)
- [fix] Use currency of the `lineItem` on every line of the `BookingBreakdown` if possible.
  [#1221](https://github.com/sharetribe/flex-template-web/pull/1221)
- [fix] AvailabilityPlan doesn't need to have entries for every day.
  [#1214](https://github.com/sharetribe/flex-template-web/pull/1214)
- [change] Default transaction process alias changed.
  [#1219](https://github.com/sharetribe/flex-template-web/pull/1219)
- [change] Add default tx process definition. Remove default email templates.
  [#1220](https://github.com/sharetribe/flex-template-web/pull/1220)

  [v3.6.0]: https://github.com/sharetribe/flex-template-web/compare/v3.5.1...v3.6.0

## [v3.5.1] 2019-09-16

- [add] add orverriding function `onAdd` and `onRemove` for `CustomOverlayView` in
  `SearchMapWithGoogleMap` to abide to React rules and do not `unmountComponentAtNode` when a
  component is rendered by React and use `appendChild` on `onAdd` instead of `draw` to
  [improve performance](https://github.com/tomchentw/react-google-maps/issues/817).
  [#1200](https://github.com/sharetribe/flex-template-web/pull/1200)
- [fix] fix `CustomOverlayView` in `SearchMapWithGoogleMap` to work with new `react-intl` version,
  overriding `render` method to render child object by using `createPortal` instead of
  `unstable_renderSubtreeIntoContainer`.
  [#1200](https://github.com/sharetribe/flex-template-web/pull/1200)

  [v3.5.1]: https://github.com/sharetribe/flex-template-web/compare/v3.5.0...v3.5.1

## [v3.5.0] 2019-08-29

- [change] Change the design of `BookingBreakdown` and add options to show only dates or booking
  date and time there. [#1195](https://github.com/sharetribe/flex-template-web/pull/1195)
- [change] Move `BookingTimeInfo` to separate component from `InboxPage`. Add options to show only
  booking dates or booking dates and times.
  [#1194](https://github.com/sharetribe/flex-template-web/pull/1194)
- [add] Add new Spanish translations related to storing payment card.
  [#1193](https://github.com/sharetribe/flex-template-web/pull/1193)
- [fix] Update yarn.lock (there was Lodash version resolution missing)
  [#1190](https://github.com/sharetribe/flex-template-web/pull/1190)

  [v3.5.0]: https://github.com/sharetribe/flex-template-web/compare/v3.4.0...v3.5.0

## [v3.4.0] 2019-08-29

- [change] Update `react-intl` to 3.1.13. More information about the changes can be found from
  [Upgrade guide for react-intl@3.x](https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md)

  - Proptype `intlShape` was removed so we needed to create it again. Because of this we added a new
    `util/reactIntl.js` file. This file is now used to wrap all the react-intl related imports.
  - `addLocaleDate` function was removed and react-intl library is now relying on native Intl APIs:
    [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules)
    and
    [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat).
    In order to support older browsers we needed to add `intl-pluralrules` and
    `intl-relativetimeformat` to `util/polyfills.js`
  - Also Node must be now compiled with `full-icu` which caused changes to `start` and `test`
    scripts in `package.json`. We also needed to add a specific config for `nodemon`
  - Default `textComponent`in `IntlProvider` changed to `React.Fragment` so we need to explicitly
    set `textComponent` to `span`. Otherwise all the snapshots would have changed and it might
    affect to UI if there is styles added to these spans generally in customization projects.

    Note: `FormattedMessage` component now supports
    [`tagName` prop](https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage)
    and
    [improved rich-text formatting](https://github.com/formatjs/react-intl/blob/master/docs/Components.md#rich-text-formatting).
    [#1181](https://github.com/sharetribe/flex-template-web/pull/1181)

- [change] Update helmet (v3.20.0 > v3.20.1).
  [#1186](https://github.com/sharetribe/flex-template-web/pull/1186)
- [fix] Lodash vulnerability: enforce newer version for react-google-maps and react-dates
  [#1188](https://github.com/sharetribe/flex-template-web/pull/1188)
- [change] Update `React`, `react-test-renderer` and `react-dom` to 16.9.0. After these updates old
  lifecycle methods `componentWillMount`, `componentWillUpdate` and `componentWillUpdate` will cause
  deprecation warnings. Check the updated components from the PR
  [#1172](https://github.com/sharetribe/flex-template-web/pull/1172)
- [fix] ProfileSettingsForm: clear correct timeout.
  [#1185](https://github.com/sharetribe/flex-template-web/pull/1185)
- [fix] `availabilityPlan` prop in `EditListingAvailabilityForm` was missing.
  [#1183](https://github.com/sharetribe/flex-template-web/pull/1183)
- [fix] Bug fix: valueFromForm prop wasn't passed through different subcomponents.
  [#1182](https://github.com/sharetribe/flex-template-web/pull/1182)
- [add] Update German and French translations.
  [#1184](https://github.com/sharetribe/flex-template-web/pull/1184)
- [change] Migrate from `react-helmet` to `react-helmet-async`
  [#1179](https://github.com/sharetribe/flex-template-web/pull/1179)
- [change] Use `sanitize.css` from own file instead of npm package because updating it accidentally
  might break the UI. [#1177](https://github.com/sharetribe/flex-template-web/pull/1177)
- [fix] Change app.test.js after `react-redux` update
  [#1178](https://github.com/sharetribe/flex-template-web/pull/1178)
- [change] Update `react-redux`: v5.1.1 -> v7.1.1
  [#1176](https://github.com/sharetribe/flex-template-web/pull/1176)
- [change] Update `seedrandom` from v2.4.4 to v3.0.3
  [#1175](https://github.com/sharetribe/flex-template-web/pull/1175)
- [change] Update `inquirer` from v6.5.0 to v7.0.0
  [#1174](https://github.com/sharetribe/flex-template-web/pull/1174)
- [change] Update final-form, final-form-arrays, react-final-form and react-final-form-arrays. This
  forced to make some code changes:

  - Old recommendation of by-passing default field formatting or parsin isn't accepted anymore
    - `format={null}` => use identity function instead: `format={v => v}`
    - `parse={null}` => use identity function instead: `parse={v => v}`
  - Final Form passes input props (name, value, onChange, onBlur, etc. ) grouped inside input key
    - those props now include `type` attribute too.
  - We had old form naming pattern with prop 'form', which now conflicted with updated Final Form
    (The 'form' prop was used when Redux-Form was the form library)

  [#1173](https://github.com/sharetribe/flex-template-web/pull/1173)

- [change] Update `react-dates` from v18.5.0 to v20.3.0
  [#1171](https://github.com/sharetribe/flex-template-web/pull/1171)
- [change] Update Prettier to v1.18.2
  [#1170](https://github.com/sharetribe/flex-template-web/pull/1170)
- [change] Update `path-to-regexp` to v3.0.0
  [#1169](https://github.com/sharetribe/flex-template-web/pull/1169)
- [change] Update `sharetribe-scripts` to v3.1.1
  [#1167](https://github.com/sharetribe/flex-template-web/pull/1167)
- [fix] Small change to remove card tect on `SavedCardDetails` modal.
  [#1166](https://github.com/sharetribe/flex-template-web/pull/1166)
- [change] Update Sentry (@sentry/browser / @sentry/node) from v4.5.1 to v5.6.2
  [#1164](https://github.com/sharetribe/flex-template-web/pull/1164)
- Update dependecies: all the easily updateable minor and batch updates: array.prototype.find,
  babel-jest, core-js, enzyme (et al.), express, helmet, inquirer, lodash, nodemon, raf, redux,
  source-map-support [#1163](https://github.com/sharetribe/flex-template-web/pull/1163)

  [v3.4.0]: https://github.com/sharetribe/flex-template-web/compare/v3.3.0...v3.4.0

## [v3.3.0] 2019-08-22

- [add] Saving payment card after payment or without initial payment. This release contains quite a
  lot changes to many files. This includes:

  - UI changes to `CheckoutPage` for showing the saved payment method
  - One more step to `handlePaymentIntent` flow on `CheckoutPage` if the user decides to save the
    payment card
  - Showing error notification on `TransactionPage` if saving the payment method has failed
  - Use Flex SDK v1.5.0 which has new endpoints for creating Stripe Customer and using Stripe
    SetupIntents
  - Add `handleCardSetup` function to `stripe.duck.js`
  - New shared duck file `paymentMethods.duck.js` for handling saving, deleting and replacing the
    payment method
  - New page `PaymentMethodsPage` in user's account settings
  - `StripePaymenAddress` used in `StripePaymentForm` is now a separate component used also in new
    `PaymentMethodsForm`
  - New `LayoutWrapperAccountSettingsSideNav` component which is used in account settings pages:
    `ContactDetailsPage`, `PasswordChangePage`, `PayoutPreferencesPage`, `PaymentMethodsPage`

  [#1138](https://github.com/sharetribe/flex-template-web/pull/1138)

Read more from Flex docs:
[How saving payment card works in FTW](https://www.sharetribe.com/docs/background/save-payment-card/)

[v3.3.0]: https://github.com/sharetribe/flex-template-web/compare/v3.2.1...v3.3.0

## [v3.2.1] 2019-08-22

- [fix] On `ListingPage` align avatar with the left side of the content and fix content width so
  that it aligns with the header image.
  [#1155](https://github.com/sharetribe/flex-template-web/pull/1155)
- [fix] Rehydrate bug: existing DOM elements were populated incorrectly
  [#1154](https://github.com/sharetribe/flex-template-web/pull/1154)
- [fix] Don't send personal id number or business profile to Stripe API when creating a Stripe
  customer if they are not required in `stripe-config.js`. This happened e.g. if someone filled the
  form after selecting the US and then before sending changed the country to Finland.
  [#1151](https://github.com/sharetribe/flex-template-web/pull/1151)
- [add] Add new French and Spanish translations related to keyword search and Spanish translations
  related to payment intents. [#1148](https://github.com/sharetribe/flex-template-web/pull/1148)
- [add] Add new French translations related to payment intents. Also few small changes to en.json
  for consistency. [#1139](https://github.com/sharetribe/flex-template-web/pull/1139)

[v3.2.1]: https://github.com/sharetribe/flex-template-web/compare/v3.2.0...v3.2.1

## [v3.2.0] 2019-07-08

- [add] Keyword search/filter added to SearchPage component.
  [#1129](https://github.com/sharetribe/flex-template-web/pull/1129)
- [fix] temporarily remove audit CI job.
  [#1136](https://github.com/sharetribe/flex-template-web/pull/1136)
- [change] Update outdated dependencies. This includes updating lodash to fix the security issue.
  [#1135](https://github.com/sharetribe/flex-template-web/pull/1135)

  [v3.2.0]: https://github.com/sharetribe/flex-template-web/compare/v3.1.1...v3.2.0

## [v3.1.1] 2019-07-08

- [fix] Ensure on `TransactionPanel` that enquiry has a correct transition when a customer tries to
  book the listing. This might happen with transaction process changes (e.g. when changing from
  previous default to SCA process).
  [#1131](https://github.com/sharetribe/flex-template-web/pull/1131)

  [v3.1.1]: https://github.com/sharetribe/flex-template-web/compare/v3.1.0...v3.1.1

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
  'line-item/night', or 'line-item/day'. There's also 'manage availability' link in the
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
