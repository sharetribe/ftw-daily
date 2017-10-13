const path = require('path');
const moment = require('moment');
const { config } = require('./importer');

const buildPath = path.resolve(__dirname, '..', 'build');
const PORT = process.env.PORT || 4000;
const USING_SSL = process.env.REACT_APP_SHARETRIBE_USING_SSL === 'true';

/**
 * Return a structure for sitemap.xml and robots.txt to be
 * used by the express-sitemap library.
 */
exports.sitemapStructure = () => {
  const now = moment().format('YYYY-MM-DD');

  return {
    url: config.canonicalRootURL.split('//')[1].split(':')[0],
    http: USING_SSL ? 'https' : 'http',
    port: PORT,
    sitemap: path.join(buildPath, 'static', 'sitemap.xml'),
    robots: path.join(buildPath, 'robots.txt'),
    sitemapSubmission: '/static/sitemap.xml',
    map: {
      '/': ['get'],
      '/signup': ['get'],
      '/login': ['get'],
      '/s?address=Helsinki%2C%20Finland%26bounds=60.2978389%2C25.254484899999966%2C59.9224887%2C24.782875800000056%26country=FI%26origin=60.16985569999999%2C24.93837910000002': [
        'get',
      ],
      '/account': ['get'],
      '/reset-password': ['get'],
      '/verify-email': ['get'],
    },
    route: {
      '/': {
        lastmod: now,
        changefreq: 'always',
        priority: 1.0,
      },
      '/signup': {
        lastmod: now,
        changefreq: 'always',
        priority: 1.0,
      },
      '/login': {
        lastmod: now,
        changefreq: 'always',
        priority: 1.0,
      },
      '/s?address=Helsinki%2C%20Finland%26bounds=60.2978389%2C25.254484899999966%2C59.9224887%2C24.782875800000056%26country=FI%26origin=60.16985569999999%2C24.93837910000002': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/account': {
        disallow: true,
      },
      '/reset-password': {
        disallow: true,
      },
      '/verify-email': {
        disallow: true,
      },
    },
  };
};
