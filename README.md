# Sharetribe Starter App

This is a template application for a Sharetribe marketplace that can
be extended and customised. It is based on an application bootstrapped
with
[create-react-app](https://github.com/facebookincubator/create-react-app) with
some additions, namely server side rendering and a custom CSS setup.

## Getting started

Install required tools:

 - [Node.js](https://nodejs.org/)
 - [Yarn](https://yarnpkg.com/)
 - Temporary (until released properly): clone [sharetribe/create-react-app](https://github.com/sharetribe/create-react-app) fork next to this repository

Clone this repository and install dependencies:

    yarn

## Development

To develop the application and to see changes live, start the frontend
development server:

    npm run dev

## Development Server

To develop the server setup, run:

    npm run dev-server

This runs the frontend production build and starts the Express.js
server in `server/index.js` that renders the application routes in the
server. The server is automatically restarted when there are changes
in the `server/` directory.

Not that this server does **not** pick up changes in the frontend
application code.

## Production Server

    npm run build
    npm start
