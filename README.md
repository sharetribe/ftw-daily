# Sharetribe Starter App

[TODO]

## Getting started

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
