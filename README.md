# Sharetribe Starter App

[![CircleCI](https://circleci.com/gh/sharetribe/sharetribe-starter-app.svg?style=shield&circle-token=198451e83e5cecb0d662949260dbc3273ac44a67)](https://circleci.com/gh/sharetribe/sharetribe-starter-app)

This is a template application for a Sharetribe marketplace that can be extended and customised. It
is based on an application bootstrapped with
[create-react-app](https://github.com/facebookincubator/create-react-app) with some additions,
namely server side rendering and a custom CSS setup.

## Documentation

Documentation can be found in the [docs directory](docs/).

## Getting started

Install required tools:

* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)

Clone this repository and install dependencies:

    yarn install

## Development

**First, you need to configure Client Id, Google Maps API key and
Stripe publishable API key via [environment
variables](./docs/env.md).** The quickest way to do this is to copy
.env-template -> .env, and edit the file to add the three mandatory
configuration values.

To develop the application and to see changes live, start the frontend development server:

    yarn run dev

**Known issues:**

* Adding/changing `import`s may not be synced properly with ESLint. You may see an error
  `Unable to resolve path to module` even though the module existing in right path. Restarting the
  server doesn't help. To solve the issue, you need to make a change to the file where the error
  occurs.

## Development Server

To develop the server setup, run:

    yarn run dev-server

This runs the frontend production build and starts the Express.js server in `server/index.js` that
renders the application routes in the server. The server is automatically restarted when there are
changes in the `server/` directory.

Not that this server does **not** pick up changes in the frontend application code.

## Tests

To start the test watcher, run

    yarn test

See more in the [testing documentation](docs/testing.md).

## License

This project is licensed under the terms of the Apache-2.0 license.

See [LICENSE](LICENSE)
