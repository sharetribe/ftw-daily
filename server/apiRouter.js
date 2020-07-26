/**
 * This file contains server side endpoints that can be used to perform backend
 * tasks that can not be handled in the browser.
 *
 * The endpoints should not clash with the application routes. Therefore, the
 * endpoints are prefixed in the main server where this file is used.
 */

const express = require('express');
const bodyParser = require('body-parser');
const { deserialize } = require('./api-util/sdk');

const initiateLoginAs = require('./api/initiate-login-as');
const loginAs = require('./api/login-as');
const transactionLineItems = require('./api/transaction-line-items');
const initiatePrivileged = require('./api/initiate-privileged');
const transitionPrivileged = require('./api/transition-privileged');
const fetch = require('node-fetch');

const router = express.Router();

// ================ API router middleware: ================ //

// Parse Transit body first to a string
router.use(
  bodyParser.text({
    type: 'application/transit+json',
  })
);

// Deserialize Transit body string to JS data
router.use((req, res, next) => {
  if (req.get('Content-Type') === 'application/transit+json' && typeof req.body === 'string') {
    try {
      req.body = deserialize(req.body);
    } catch (e) {
      console.error('Failed to parse request body as Transit:');
      console.error(e);
      res.status(400).send('Invalid Transit in request body.');
      return;
    }
  }
  next();
});

// ================ API router endpoints: ================ //

router.get('/initiate-login-as', initiateLoginAs);
router.get('/login-as', loginAs);
router.post('/transaction-line-items', transactionLineItems);
router.post('/initiate-privileged', initiatePrivileged);
router.post('/transition-privileged', transitionPrivileged);

// ================ Shopify endpoints: ================ //
const { SHOPIFY_FAHERTY_ACCESS_TOKEN } = process.env;
router.get('/shop-info', (req, res) => {
  // shop should be stored in a variable somewhere
  fetch('https://sonias-clothing-store.myshopify.com/admin/api/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_FAHERTY_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: `{
         shop {
           name
           url
           email
           myshopifyDomain
         }
       }`,
    }),
  })
    .then(result => {
      return result.json();
    })
    .then(data => {
      console.log('data returned:\n', data);
      res.send(data);
    });
});

router.get('/products', (req, res) => {
  // shop should be stored in a variable somewhere
  fetch('https://sonias-clothing-store.myshopify.com/admin/api/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_FAHERTY_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: `{
        products(first: 50) {
          edges {
            node {
              id
              featuredImage {
                id
                originalSrc
              }
              title
              tags
            }
          }
        }
      }
      
      `,
    }),
  })
    .then(result => {
      return result.json();
    })
    .then(data => {
      console.log('data returned:\n', data);
      res.send(data);
    });
});

module.exports = router;
