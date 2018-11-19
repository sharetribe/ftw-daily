# Translations

The Flex template for web supports having a single language for the UI. By default the language is
English.

We are using the [React Intl](https://github.com/yahoo/react-intl) library to translate UI texts and
to format dates, numbers, and money values.

## The translation file

All the text translations can be found in the
[src/translations/en.json](../src/translations/en.json) file. The translation data is formatted as
one JSON object with all the translations as properties.

The key - value syntax is as follows:

```
"<component name>.<translation key>": "<translation>"
```

For example:

```
"ManageListingCard.viewListing": "View listing"
```

The keys are namespaced to the corresponding component. This is aligned with the component driven
paradigm that the application follows. It might introduce duplication with same translation texts
occurring multiple times in the translation file but it also emphasizes how all the components are
independent, how a component can be used anywhere and how modifications to a single component do not
affect other components.

## Using the translations

React Intl provides multiple ways to access the translation data but the most commonly used are the
`formatMessage` function and the `FormattedMessage` tag provided by React Intl.

To use the `formatMessage` function, component needs to be wrapped with the `injectIntl` function
which provides a render prop called `intl`. `intl` then provides all the React Intl translation
functions, like `formatMessage`:

```js
import { intlShape, injectIntl } from 'react-intl';

const SomeComponent = props => {
  const { intl } = props;

  const translation = intl.formatMessage({ id: 'SomeComponent.someKey' });

  // ...
};

SomeComponent.propTypes = {
  // from injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(SomeComponent);
```

As for the `FormattedMessage` it just needs to be imported from `react-intl` and it takes the id
prop:

```
<FormattedMessage id="SomeCompoennt.someKey" />
```

Other functions and componets can be explored in the
[React Intl documentation](https://github.com/yahoo/react-intl/wiki).

## Formatting

React Intl uses the [FormatJS](https://formatjs.io/) formatters for shaping the translation texts
based on given arguments. Here are a few examples on how to use FormatJS.

### Arguments

Pass a named argument to the format function/component. For the following translation:

```js
"EnquiryForm.messageLabel": "Message to {authorDisplayName}",
```

Pass the author data in the `FormattedMessage` component:

```js
<FormattedMessage id="EnquiryForm.messageLabel" values={{ authorDisplayName: 'Jane D' }} />
```

Or the the `formatMessage` function:

```js
intl.formatMessage({ id: 'EnquiryForm.messageLabel' }, { authorDisplayName: 'Jane D' });
```

### Pluralization

With pluralization a translation can be formatted to adapt to a number argument.

```js
"ManageListingsPage.youHaveListings": "You have {count} {count, plural, one {listing} other {listings}}",
```

This translation takes the `count` argument and uses the `plural`, `one` and `other` keywords to
format the last word of the translation to be _listing_ or _listings_ based on the `count`. The
pluralized translation can be used with the `FormattedMessage` component:

```js
<FormattedMessage id="ManageListingsPage.youHaveListings" values={{ count: 3 }} />
```

Or with the `formatMessage` function:

```js
intl.formatMessage({ id: 'ManageListingsPage.youHaveListings' }, { count: 1 });
```

More formatting examples can be found from the
[FormatJS message syntax documentation](https://formatjs.io/guides/message-syntax/).

## Texts outside the translation file

A few components in the template app contain texts that are not included in the `en.json` file,
namely `AboutPage`, `PrivacyPolicy`, and `TermsOfService`. The reason behind this is that these
components only contain static content that is laid out in more of a document format so the
translations for these texts can easily be changed and maintained in the component files themselves.

More information about adding static content to the application can be found from
[the static pages documentation](./static-pages.md).

## Changing the language

For changing the language of the template application:

* Copy the default [src/translations/en.json](../src/translations/en.json) English translations file
  into some other file like `es.json`.

* Change the messages in the new translations file to the desired language.

* In [src/config.js](../src/config.js), change the `locale` variable value to match the new locale
  (the name of the new translations file, without the extension), for example:

```js
const locale = 'es';
```

* In [src/app.js](../src/app.js), change the translation imports to point to the correct
  `react-intl` locale and the new translations file you created, for example:

```js
import localeData from 'react-intl/locale-data/es';
import messages from './translations/es.json';
```

Also, in case you will translate the application and develop it forward it is wise to change the
translations file that the tests use. Normally tests are language agnostic as they use translation
keys as values. However, when adding new translations you can end up with missing translation keys
in tests. To change the translation file used in tests change the `messages` variable in
[src/util/test-helpers.js](../src/util/test-helpers.js) to match your language in use, for example:

```js
import messages from '../translations/es.json';
```

## Managing translations

In case you have added a new language translation file and are pulling translation updates to
`en.json` from the upstream repo there is a command line tool to help keeping the translation files in
sync. Running the following command in the project root

```
node translations.js

```
will start a command line application that can be used to match a translation file agains the
English translations. Just modify the `translations.js` file and add you language to the
`TARGET_LANGS` array and it will be available in the tool.
