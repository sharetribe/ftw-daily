# Environment configuration variables

The following configuration variables can be set to control the Starter App behaviour. Most of them
have defaults that work for development environment. For production deploys most should be set.

| Variable                                  | Must be set? | Default               | Description                                                                                                       |
| ----------------------------------------- | ------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| REACT_APP_GOOGLE_MAPS_API_KEY             | X            | -                     | See: [Google Maps API key](./google-maps.md)                                                                      |
| REACT_APP_SHARETRIBE_SDK_CLIENT_ID        | X            | -                     | Client ID (API key). You will get this from the Sharetribe team.                                                  |
| REACT_APP_STRIPE_PUBLISHABLE_KEY          | X            | -                     | Stripe publishable API key for generating tokens with Stripe API. Use test key (prefix pk*test*) for development. |
| REACT_APP_SHARETRIBE_SDK_BASE_URL         |              | http://localhost:8088 | The base url to access the Sharetribe Flex Marketplace API.                                                       |
| REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY |              | USD                   | The currency used in the Marketplace as ISO 4217 currency code. For example: USD, EUR, CAD, AUD, etc.             |
| REACT_APP_CANONICAL_ROOT_URL              |              | http://localhost:3000 | Canonical root url of the marketplace. Needed for social media sharing and SEO optimization.                      |
| NODE_ENV                                  |              | ?                     | Node env. Use 'development' for development and 'production' for production.                                      |
| PORT                                      |              | 4000                  | Port for server to accept connections.                                                                            |
| REACT_APP_ENV                             |              | production            | Env for client side. Use the same value as with NODE_ENV.                                                         |
| REACT_APP_SHARETRIBE_USING_SSL            |              | false                 | Redirect HTTP to HTTPS?                                                                                           |
| SERVER_SHARETRIBE_TRUST_PROXY             |              | false                 | Set when running the app behind a reverse proxy, e.g. in Heroku.                                                  |
| REACT_APP_PUBLIC_SENTRY_DSN               |              | -                     | See: [Error logging with Sentry](./sentry.md)                                                                     |
| SERVER_SENTRY_DSN                         |              | -                     | See: [Error logging with Sentry](./sentry.md)                                                                     |
| REACT_APP_CSP                             |              | -                     | See: [Content Security Policy (CSP)](./content-security-policy.md)                                                |
| BASIC_AUTH_USERNAME                       |              | -                     | Set to enable HTTP Basic Auth                                                                                     |
| BASIC_AUTH_PASSWORD                       |              | -                     | Set to enable HTTP Basic Auth                                                                                     |
| REACT_APP_GOOGLE_ANALYTICS_ID             |              | -                     | See: [Google Analytics](./analytics.md)                                                                           |

## Defining the env variables

When the Starter App is started locally with `yarn run dev` or `yarn run dev-server`, you can set
environment variables by using the file .env file. The repository contains a template file
.env-template. Just copy that as .env and edit as necessary.

In production, it's recommended that you set the configuration via env variables and do not deploy
an .env file. The client application will only be packaged with env variables that start with
REACT_APP. This way server secrets don't end up in client bundles.
