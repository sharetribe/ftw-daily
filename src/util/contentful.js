import {createClient} from 'contentful';
// ===== Contentful ======== //

let apiToken = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN;

console.log(apiToken);
const contentfulclient = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "2jrncopryo0k",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'h4xG4is0Ak-rh4GF2CzuHYl_EuIwsOcta3rYEwcm4b0',
  host: 'cdn.contentful.com',
  
});

export default contentfulclient;
//===================================//
