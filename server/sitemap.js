const path = require('path');
const moment = require('moment');

const buildPath = path.resolve(__dirname, '..', 'build');
const PORT = parseInt(process.env.PORT, 10);
const USING_SSL = process.env.REACT_APP_SHARETRIBE_USING_SSL === 'true';

/**
 * Resolves domain and port information from
 * a URL, for example:
 * https://example.com:8080 => example.com:8080
 */
const domainAndPort = rootURL => {
  if (rootURL.indexOf('//') === -1) {
    return rootURL;
  } else {
    return rootURL.split('//')[1];
  }
};

/**
 * Resolves the domain from a URL, for example:
 * https://example.com:8080 => example.com
 */
const domain = rootURL => {
  if (!rootURL) {
    return 'INVALID_URL';
  }

  return domainAndPort(rootURL).split(':')[0];
};

/**
 * Resolves the port number from a URL. If the port
 * can not be found `undefined` will be returned.
 */
const port = rootURL => {
  if (!rootURL) {
    return 'INVALID_URL';
  }

  return domainAndPort(rootURL).split(':')[1];
};

/**
 * Return a structure for sitemap.xml and robots.txt to be used by the
 * express-sitemap library. Uses the canonical URL value from env
 * config for domain and port information.
 */
exports.sitemapStructure = () => {
  const now = moment().format('YYYY-MM-DD');

  return {
    url: domain(process.env.REACT_APP_CANONICAL_ROOT_URL),
    http: USING_SSL ? 'https' : 'http',
    port: port(process.env.REACT_APP_CANONICAL_ROOT_URL),
    sitemap: path.join(buildPath, 'static', 'sitemap.xml'),
    robots: path.join(buildPath, 'robots.txt'),
    sitemapSubmission: '/static/sitemap.xml',
    map: {
      '/': ['get'],
      '/faq': ['get'],
      '/privacy-policy': ['get'],
      '/blog': ['get'],
      '/terms-of-service': ['get'],
      '/about': ['get'],
      '/fees': ['get'],
      '/guidelines': ['get'],
      '/cancellations': ['get'],
      '/blog/category/office-space/': ['get'],
      '/signup': ['get'],
      '/login': ['get'],
      '/blog/what-do-you-need-to-become-a-freelance-hairdresser-barber/': ['get'],
      '/blog/5-event-venues-to-rent-for-christmas/': ['get'],
      '/blog/start-your-own-nail-business/': ['get'],
      '/blog/best-workspaces-to-rent-in-london/': ['get'],
      '/blog/how-professional-musician-sam-thomas-makes-an-additional-income-renting-out-his-home-studio/': ['get'],
      '/blog/simple-tricks-to-improve-your-salon-decor-for-social-media/': ['get'],
      '/blog/michael-brown-private-gym-space-personal-trainer/': ['get'],
      '/blog/six-stunning-nail-stations-to-rent/': ['get'],
      '/blog/best-secret-london-coworking-spaces/': ['get'],
      '/blog/patches-to-keep-your-new-years-resolution-with/': ['get'],
      '/blog/10-salon-chairs-to-hire-london/': ['get'],
      '/blog/happy-lockdown-iversary-what-s-next-for-workspace-9218a37fc413/': ['get'],
      '/blog/music-studio-hire/': ['get'],
      '/blog/coworking-space-in-london/': ['get'],
      '/blog/6-nail-salons-in-london-to-rent/': ['get'],
      '/blog/4-reasons-coworking-works-for-your-business/': ['get'],
      '/blog/listing-your-patch-definitive-guide/': ['get'],
      '/blog/tag/event-space-in-east-london/': ['get'],
      '/l/concert-hall-space-to-hire-in-dalston/62fe5419-e1e3-463e-a1d5-caa116493bac': ['get'],
      // '/signup': ['get'],
      // '/login': ['get'],
      // '/s?address=Helsinki%2C%20Finland%26bounds=60.2978389%2C25.254484899999966%2C59.9224887%2C24.782875800000056%26country=FI%26origin=60.16985569999999%2C24.93837910000002': [
      //   'get',
      // ],
      '/account': ['get'],
      '/reset-password': ['get'],
      '/verify-email': ['get'],
    },
    route: {
      '/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 1.0,
      },
      '/faq': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      },
      '/l/concert-hall-space-to-hire-in-dalston/62fe5419-e1e3-463e-a1d5-caa116493bac': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      },
      '/privacy-policy': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      },
      '/blog': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      },
      '/terms-of-service': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      },
      '/about': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      },
      '/fees': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      },
      '/guidelines': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      },
      '/cancellations': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      },
      '/blog/category/office-space/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/signup': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/login': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/what-do-you-need-to-become-a-freelance-hairdresser-barber/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/5-event-venues-to-rent-for-christmas/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/start-your-own-nail-business/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/best-workspaces-to-rent-in-london/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/how-professional-musician-sam-thomas-makes-an-additional-income-renting-out-his-home-studio/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/simple-tricks-to-improve-your-salon-decor-for-social-media/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/michael-brown-private-gym-space-personal-trainer/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/six-stunning-nail-stations-to-rent/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/best-secret-london-coworking-spaces/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/patches-to-keep-your-new-years-resolution-with/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      '/blog/10-salon-chairs-to-hire-london/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.7,
      },
      '/blog/happy-lockdown-iversary-what-s-next-for-workspace-9218a37fc413/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.7,
      },
      '/blog/music-studio-hire/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.7,
      },
      '/blog/coworking-space-in-london/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.7,
      },
      '/blog/6-nail-salons-in-london-to-rent/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.7,
      },
      '/blog/4-reasons-coworking-works-for-your-business/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.7,
      },
      '/blog/listing-your-patch-definitive-guide/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.7,
      },
      '/blog/tag/event-space-in-east-london/': {
        lastmod: now,
        changefreq: 'daily',
        priority: 0.7,
      },
      // '/s?address=Helsinki%2C%20Finland%26bounds=60.2978389%2C25.254484899999966%2C59.9224887%2C24.782875800000056%26country=FI%26origin=60.16985569999999%2C24.93837910000002': {
      //   changefreq: 'daily',
      //   priority: 1.0,
      // },
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
