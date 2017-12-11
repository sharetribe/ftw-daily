# Error logging with Sentry

The Starter App supports error logging with [Sentry](https://sentry.io/) out of the box provided
that required environment variables are set in place. Other logging solutions can also be used but
the Sentry client comes already strapped into the Starter App.

To enable the Sentry error logging a DSN, _Data Source Name_ has to be provided as an environment
variable. Browser and Node environments both require their own keys. The key names are as follows:

* **SERVER_SENTRY_DSN** - the private Sentry DSN, used on the server side
* **REACT_APP_PUBLIC_SENTRY_DSN** - the public Sentry DSN, used in the browser

The DSN keys can be aquired from the Sentry project settings. To test them in your local environment
they can be passed for example to the `yarn run dev-server` command:

    REACT_APP_PUBLIC_SENTRY_DSN='<public-sentry-dsn>' SERVER_SENTRY_DSN='<private-sentry-dsn>' yarn run dev-server

If the Sentry DSN keys are not provided Starter App will log errors to the console. The logging and
Sentry setup is implemented in [util/log.js](../src/util/log.js) and
[server/log.js](../server/log.js) so refer to those files to change the external logging service or
the logging logic in general.
