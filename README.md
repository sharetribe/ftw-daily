# Sharetribe Starter App

This is a template application for a Sharetribe marketplace that can
be extended and customised. It is based on an application bootstrapped
with
[create-react-app](https://github.com/facebookincubator/create-react-app) with
some additions, namely server side rendering and a custom CSS setup.

## Documentation

Documentation can be found in the [docs directory](docs/).

## Getting started

Install required tools:

 - [Node.js](https://nodejs.org/)
 - [Yarn](https://yarnpkg.com/)

Clone this repository and install dependencies:

    yarn install

## Development

To develop the application and to see changes live, start the frontend
development server:

    yarn run dev

## Development Server

To develop the server setup, run:

    yarn run dev-server

This runs the frontend production build and starts the Express.js
server in `server/index.js` that renders the application routes in the
server. The server is automatically restarted when there are changes
in the `server/` directory.

Not that this server does **not** pick up changes in the frontend
application code.

## Tests

To start the test watcher, run

    yarn test

See more in the [testing documentation](docs/testing.md).

## Production Server

    yarn run build
    yarn start
