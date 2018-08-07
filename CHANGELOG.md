# Change Log

We are not following semantic versioning in this template app since any change could potentially be
a breaking change for forked customization projects. We are still experimenting with what is a good
way to update this template, but currently, we follow a pattern:

* Major version change (v**X**.0.0): Changes to several pages and other components. Consider
  implementing this without merging upstream (we'll provide instructions).
* Minor version change (v0.**X**.0): New features and changes to a single page. These are likely to
  cause conflicts.
* Patch (v0.0.**X**): Bug fixes and small changes to components.

---
## Upcoming version 2018-08-XX

## v1.3.2 2018-08-07
* [change] Update the Sharetribe Flex SDK to the 1.0.0 version in NPM.
  All the `sharetribe-sdk` imports are now using the new package name
  `sharetribe-flex-sdk`.
  [#884](https://github.com/sharetribe/flex-template-web/pull/884)
* [change] Reusable SearchMap. Fixed the original reverted version. (Includes audit exception 678)
  [#882](https://github.com/sharetribe/flex-template-web/pull/882)

## v1.3.1
* [fix] Hotfix: reverting the usage of ReusableMapContainer due to
  production build error.
  [#881](https://github.com/sharetribe/flex-template-web/pull/881)

## v1.3.0
* [change] Reusable SearchMap.
  [#877](https://github.com/sharetribe/flex-template-web/pull/877)
* [fix] Fix a search filters panel bug where selecting an option in a multi select filter ends up
  invoking a mobile filter callback function.
  [#876](https://github.com/sharetribe/flex-template-web/pull/876)
* [change] Use seeded random for client side coordinate obfuscation
  [#874](https://github.com/sharetribe/flex-template-web/pull/874)

## v1.2.2
* [change] Change static map to dynamic map when clicked.
  [#871](https://github.com/sharetribe/flex-template-web/pull/871)

## v1.2.1
* [fix] Lazy load map only if the map is near current viewport.
  [#871](https://github.com/sharetribe/flex-template-web/pull/871)

## v1.2.0
* [change] Use Google's static map on ListingPage.
  This is a reaction to pricing change of Google Maps APIs.
  [#869](https://github.com/sharetribe/flex-template-web/pull/869)
* [change] Use sessionTokens and fields for Autocomplete calls to Google Maps.
  This is a reaction to pricing change of Google Maps APIs.
  [#867](https://github.com/sharetribe/flex-template-web/pull/867)
* [change] Change TransactionPage state management in loadData.
  [#863](https://github.com/sharetribe/flex-template-web/pull/863), [#865](https://github.com/sharetribe/flex-template-web/pull/865) & [#866](https://github.com/sharetribe/flex-template-web/pull/866)
* [fix] Fix submit button state on contact details page.
  [#864](https://github.com/sharetribe/flex-template-web/pull/864)
* [fix] Fix listing page host section layout bug.
  [#862](https://github.com/sharetribe/flex-template-web/pull/862)
* [fix] Fix initial message input clearing too early in checkout page.
  [#861](https://github.com/sharetribe/flex-template-web/pull/861)
* [fix] Fix setting Topbar search input initial value.
* [change] Update Redux to v4
  [#859](https://github.com/sharetribe/flex-template-web/pull/859)
* [fix] Fix setting Topbar search input initial value
  [#857](https://github.com/sharetribe/flex-template-web/pull/857)

## v1.1.0
* [fix] Improve slug creation (slashes were breaking rendering in some environments)
  [#850](https://github.com/sharetribe/flex-template-web/pull/850)
* [fix] Anonymous user should see contact link on UserCard
  [#851](https://github.com/sharetribe/flex-template-web/pull/851)
* [fix] Persisting booking request details across authentication
  [#852](https://github.com/sharetribe/flex-template-web/pull/852)
* [change] Footer styles changed to more generic (no disappearing columns etc.)
  If you have made changes to Footer, consider extracting it to different component before update.
  [#853](https://github.com/sharetribe/flex-template-web/pull/853)
* [change] Logo customization refactored to be easier. Check CheckoutPage, TopbarDesktop and Footer
  after update.
  [#854](https://github.com/sharetribe/flex-template-web/pull/854)
* [fix] Fix showing reviews from banned users.
  [#855](https://github.com/sharetribe/flex-template-web/pull/855)

## v1.0.0

* [change] Migrate remaining Redux Forms to Final Form. Also now all the form components can be
  found in the src/forms folder. Remove redux-form from the dependencies.
  [#845](https://github.com/sharetribe/flex-template-web/pull/845)
* [fix] Extract and fix missing information reminder modal from Topbar
  [#846](https://github.com/sharetribe/flex-template-web/pull/846)
* [fix] Add missing styles for ModalMissingInformation from Topbar
  [#847](https://github.com/sharetribe/flex-template-web/pull/847)
* [fix] API does not return all image variants anymore, this adds correct variants to update
  contact details call.
  [#848](https://github.com/sharetribe/flex-template-web/pull/848)

## v0.3.1

* [change] Change lodash import syntax to reduce bundle size (-15.14 KB)
  [#839](https://github.com/sharetribe/flex-template-web/pull/839)
* [fix] Use https instead of git to access SDK repo for Heroku build (now that the repo is public).
  TODO: create SDK releases instead of using direct refs to single commit.
  [#841](https://github.com/sharetribe/flex-template-web/pull/841)
* [fix] Typo fix for background-color
  [#842](https://github.com/sharetribe/flex-template-web/pull/842)

## v0.3.0

* Remove custom touched handling from `FieldCheckboxGroup` as it has has become obsolete now that
  Final Form is replacing Redux Form.
  [#837](https://github.com/sharetribe/flex-template-web/pull/837)
* Create Stripe account directly instead of passing payout details to Flex API (deprecated way).
  [#836](https://github.com/sharetribe/flex-template-web/pull/836)

## v0.2.0

* Starting a change log for Flex Template for Web.
