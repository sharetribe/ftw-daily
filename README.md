# Sharetribe Flex Template for Web

[![CircleCI](https://circleci.com/gh/sharetribe/flex-template-web.svg?style=svg&circle-token=198451e83e5cecb0d662949260dbc3273ac44a67)](https://circleci.com/gh/sharetribe/flex-template-web)

This is a template web application for a Sharetribe Flex marketplace ready to be extended and
customized. It is based on an application bootstrapped with
[create-react-app](https://github.com/facebookincubator/create-react-app) with some additions,
namely server side rendering and a custom CSS setup.

## Quick start

If you just want to get the app running quickly to test it out, first install
[Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/), and follow along:

```sh
git clone git@github.com:sharetribe/flex-template-web.git      # clone this repository
cd flex-template-web/                                          # change to the cloned directory
yarn install                                                   # install dependencies
yarn run config                                                # add the mandatory env vars to your local config
yarn run dev                                                   # start the dev server, this will open a browser in localhost:3000
```

### If you are using Stripe account created after 19th of February 2019 there might be problems saving the payout details in FTW (22.2.2019)

We found out that Stripe has updated their API 19.2.2019 and after that, the `legal_entity`
parameter used in creating stripe account has been broken into 3 dictionaries of `individual`,
`company` and `business_type` (https://stripe.com/docs/upgrades#api-changelog). Legal entity is
passed to Stripe in function `createStripeAccount` in `user.duck.js'`` file and it's used for avaing
the user's payout details. Because of the issue, saving the payout details is not currently working
in FTW. We will continue investigating the issue on Monday 25.2.2019.

You can also follow along the
[Getting started with FTW](https://www.sharetribe.com/docs/tutorials/getting-started-with-ftw/)
tutorial in the [Flex Docs website](https://www.sharetribe.com/docs/).

For more information of the configuration, see the
[FTW Environment configuration variables](https://www.sharetribe.com/docs/references/ftw-env/)
reference in Flex Docs.

**Note:** If you want to build your own Flex marketplace on top of the template, you should fork the
repository instead of cloning it. See the
[How to Customize FTW](https://www.sharetribe.com/docs/guides/how-to-customize-ftw/) guide in Flex
Docs.

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

## License

This project is licensed under the terms of the Apache-2.0 license.

See [LICENSE](LICENSE)
