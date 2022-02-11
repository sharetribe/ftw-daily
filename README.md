# Sharetribe Flex Template for Web

[![CircleCI](https://circleci.com/gh/sharetribe/ftw-daily.svg?style=svg)](https://circleci.com/gh/sharetribe/ftw-daily)

This is a template web application for a Sharetribe Flex marketplace ready to be extended and
customized. It is based on an application bootstrapped with
[create-react-app](https://github.com/facebookincubator/create-react-app) with some additions,
namely server side rendering and a custom CSS setup.

> Note: We also have two more templates available:
> [FTW-hourly](https://github.com/sharetribe/ftw-hourly) and
> [FTW-product](https://github.com/sharetribe/ftw-product). FTW-hourly focuses on time-based booking
> processes. You can read more in the
> [Flex Docs article introducing FTW-hourly](https://www.sharetribe.com/docs/ftw-introduction/ftw-hourly/).
> FTW-product focuses on product marketplace with listing stock management. You can find more
> information in the
> [introduction to FTW-product Flex Docs](https://www.sharetribe.com/docs/ftw-introduction/ftw-product/).

## Quick start

If you just want to get the app running quickly to test it out, first install
[Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/), and follow along:

```sh
git clone [repo-url]                                           # clone this repository
cd rather-rent-ftw/                                            # change to the cloned directory
yarn install                                                   # install dependencies
yarn run config                                                # add the mandatory env vars to your local config
yarn run dev                                                   # start the dev server, this will open a browser in localhost:3000
```

You can also follow along the
[Getting started with FTW](https://www.sharetribe.com/docs/tutorials/getting-started-with-ftw/)
tutorial in the [Flex Docs website](https://www.sharetribe.com/docs/).

For more information of the configuration, see the
[FTW Environment configuration variables](https://www.sharetribe.com/docs/references/ftw-env/)
reference in Flex Docs.

### For Windows users

Change `export` to `set` in the package.json file if you're using Windows/DOS. You need to do the
change to "dev" and "dev-sever" commands.

```
"dev": "yarn run config-check&&set NODE_ENV=development&& set REACT_APP_DEV_API_SERVER_PORT=3500&&concurrently --kill-others \"yarn run dev-frontend\" \"yarn run dev-backend\""
```

```
"dev-server": "set NODE_ENV=development&& set PORT=4000&& set REACT_APP_CANONICAL_ROOT_URL=http://localhost:4000&&yarn run build&&nodemon --watch server server/index.js"
```

We strongly recommend installing
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about), if you are
developing on Windows. These templates are made for Unix-like web services which is the most common
environment type on host-services for web apps. Also, Flex Docs uses Unix-like commands in articles
instead of DOS commands.

See the [How to Customize FTW](https://www.sharetribe.com/docs/guides/how-to-customize-ftw/) guide
in Flex Docs.

## Deploying to Heroku

Every push to staging branch is automatically deployed to the
[heroku site](https://rather-rent-ftw.herokuapp.com/)

## Documentation

See the Flex Docs site: https://www.sharetribe.com/docs/

See also the [docs/](docs/) directory for some additional internal documentation.
