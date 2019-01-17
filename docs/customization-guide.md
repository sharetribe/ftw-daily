# Customization guide

So you've decided to build your own Flex marketplace using the template. That's awesome! This guide
will help you in setting up your fork and describes the general workflow.

**Note:** If you cloned the repository like described in the Quick start section of the project
README file, you probably don't want to make the customizations in that project. Forking the
repository is the recommended way to proceed. Follow this guide for instructions.

## Requirements

Install required tools:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Technologies

Depending on what you want to change in the template, various skills help in achieving your goal.
Some of the basic customizations don't require specific coding skills, but many customisations
become technically involved. We've tried to keep the technology setup as simple as possible, and
frontend developers with experience in widely used tooling should feel comfortable right from the
get-go.

Here are some main technologies that the template uses:

- JavaScript: programming language for the whole application
- CSS: styling the user interface using [CSS Modules](https://github.com/css-modules/css-modules)
- [React](https://reactjs.org/): library for creating user interfaces with components
- [Redux](https://redux.js.org/): state and data flow handling
- [Final Form](https://github.com/final-form/final-form): forms
- [React Router](https://reacttraining.com/react-router/): routing
- [Express](https://expressjs.com/): server

## Setup

To start a new customization project, you should create a separate Git repository and setup the Git
remotes so that you can pull in changes from the main (upstream) repository to your custom
repository.

### Fork the repository

See the [Fork a repo](https://help.github.com/articles/fork-a-repo/) documentation for instructions
for forking a repository in GitHub.

In the directory you want to create the project in:

    git clone git@github.com:YOUR_USERNAME/YOUR_FORK.git                         # clone your fork
    cd YOUR_FORK                                                                 # changed to the cloned directory
    git remote add upstream git@github.com:sharetribe/flex-template-web.git      # add the template as the upstream remote

See also the
[Configuring a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/)
documentation.

### Pull in latest upstream changes

If you want to update your local customization project with changes in the template, you should pull
in changes from the upstream remote.

**Note:** Depending on the changes you've made to the template, this might be hard/impossible
depending on what has changed in the template. You should mainly think of the template being the
starting point of your customization, not something that is constantly updated.

In the `master` branch (or in the branch you want to merge in the upstream changes):

1.  Fetch the latest changes from the upstream repository:

    ```sh
    git fetch upstream
    ```

1.  Merge the changes to your local branch

    ```sh
    git merge upstream/master
    ```

1.  Fix possible merge conflicts, commit, and push/deploy.

See also the [Syncing a fork](https://help.github.com/articles/syncing-a-fork/) documentation.

## Installing dependecies

In your project root, install dependencies:

    yarn install

## Configuration

There are some mandatory configuration, and some configuration that you most likely want to at least
go through.

To get started, run:

    yarn run config

This command will create `.env` file and guide you trough setting up the required environment
variables. The `.env` file is the place to add your local configuration. It is ignored in Git, so
you'll have to add the corresponding configuration also to your server environment.

There are some mandatory configuration variables that are defined in the template. See the
[Environment configuration variables](env.md) documentation for more information.

See also the [src/config.js](../src/config.js) file for more configuration options.

## Development

To develop the application and to see changes live, start the frontend development server:

    yarn run dev

**Known issues:**

- Adding/changing `import`s may not be synced properly with ESLint. You may see an error
  `Unable to resolve path to module` even though the module existing in right path. Restarting the
  server doesn't help. To solve the issue, you need to make a change to the file where the error
  occurs.

## Development Server

The usual way to develop the application is to use the frontend development server (see above).
However, in production you likely want to use the server rendering setup. To develop the server
rendering setup locally, run:

    yarn run dev-server

This runs the frontend production build and starts the Express.js server in `server/index.js` that
renders the application routes in the server. The server is automatically restarted when there are
changes in the `server/` directory.

**Note:** this server does **not** pick up changes in the frontend application code. For that you
need to build the client bundle by restarting the server manually.

## Tests

To start the test watcher, run

    yarn test

See more in the [testing documentation](testing.md).

## Customization

There are many things that you should change in the default template, and many more that you can
change. Read [more about FTW](README.md) and check the
[Customization checklist](customization-checklist.md) documentation too before publishing your site.
