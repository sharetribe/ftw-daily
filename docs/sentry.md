# Error logging with Sentry

The Flex template application supports error logging with [Sentry](https://sentry.io/) out of the
box provided that required environment variables are set in place. Other logging solutions can also
be used but the Sentry client comes already strapped into application.

## Setting up Sentry keys

To enable the Sentry error logging a DSN, _Data Source Name_ has to be provided as an environment
variable. Browser and Node environments both require their own keys. The key names are as follows:

- **SERVER_SENTRY_DSN** - the private Sentry DSN, used on the server side
- **REACT_APP_PUBLIC_SENTRY_DSN** - the public Sentry DSN, used in the browser

The DSN keys can be aquired from the Sentry project settings. To test them in your local environment
they can be passed for example to the `yarn run dev-server` command:

    REACT_APP_PUBLIC_SENTRY_DSN='<public-sentry-dsn>' SERVER_SENTRY_DSN='<private-sentry-dsn>' yarn run dev-server

If the Sentry DSN keys are not provided the template app will log errors to the console. The logging
and Sentry setup is implemented in [util/log.js](../src/util/log.js) and
[server/log.js](../server/log.js) so refer to those files to change the external logging service or
the logging logic in general.

## Source map retrieval

By default Sentry fetches the source maps for minified javascript files. However, this might now
work in case some sort of authentication, e.g. basic auth, is required to reach your application. To
circumvent this a security token can be configured to Sentry. Sentry then adds this token to the
source maps request header so that the server hosting the marketplace can then be configured to let
those requests access the source maps.

For basic auth the security token can be configured as follows:

In _Project > Settings > General > Client Security_ set the following values

- **Security token** - `Basic <your username:password in Base 64>`
- **Security token header** - `Authorization`
