# Sharetribe Flex Template for Web

[![CircleCI](https://circleci.com/gh/sharetribe/ftw-daily.svg?style=svg)](https://circleci.com/gh/sharetribe/ftw-daily)

This is a template web application for a Sharetribe Flex marketplace ready to be extended and
customized. It is based on an application bootstrapped with
[create-react-app](https://github.com/facebookincubator/create-react-app) with some additions,
namely server side rendering and a custom CSS setup.

> Note: We also have [FTW-hourly](https://github.com/sharetribe/ftw-hourly) for time-based
> processes. If you are taking time-based booking process into use, you should consider using it
> instead. You can read more from the related
> [Flex Docs article](https://www.sharetribe.com/docs/background/time-based-template)

## Quick start

If you just want to get the app running quickly to test it out, first install
[Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/), and follow along:

```sh
git clone git@github.com:sharetribe/ftw-daily.git      # clone this repository
cd ftw-daily/                                          # change to the cloned directory
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
"dev": "yarn run config-check&&set NODE_ENV=development REACT_APP_DEV_API_SERVER_PORT=3500&&concurrently --kill-others \"yarn run dev-frontend\" \"yarn run dev-backend\""
```

```
"dev-server": "set NODE_ENV=development PORT=4000 REACT_APP_CANONICAL_ROOT_URL=http://localhost:4000&&yarn run build&&nodemon --watch server server/index.js"
```

We strongly recommend installing
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about), if you are
developing on Windows. These templates are made for Unix-like web services which is the most common
environment type on host-services for web apps. Also, Flex Docs uses Unix-like commands in articles
instead of DOS commands.

## Getting started with your own customization

If you want to build your own Flex marketplace by customizing the template application, see the
[How to Customize FTW](https://www.sharetribe.com/docs/guides/how-to-customize-ftw/) guide in Flex
Docs.

## Deploying to Heroku

**Note:** Remember to fork the repository before deploying the application. Connecting your own
Github repository to Heroku will make manual deploys easier.

See the
[How to deploy FTW to production](https://www.sharetribe.com/docs/guides/how-to-deploy-ftw-to-production/)
guide in Flex Docs for more information.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Documentation

See the Flex Docs site: https://www.sharetribe.com/docs/

See also the [docs/](docs/) directory for some additional internal documentation.

## Get help – join Sharetribe Flex Developer Slack channel

If you have any questions about development, the best place to ask them is the Flex Developer Slack
channel at https://www.sharetribe.com/flex-slack

## License

This project is licensed under the terms of the Apache-2.0 license.

See [LICENSE](LICENSE)
