import {createClient} from 'contentful';
import config from '../config';
// ===== Contentful client ======== //


const contentfulclient = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "2jrncopryo0k",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: config.contentfulAPIKey,
  host: 'cdn.contentful.com',
  
});

export default contentfulclient;
//===================================//
