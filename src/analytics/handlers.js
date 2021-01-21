export class LoggingAnalyticsHandler {
  trackPageView(url) {
    console.log('Analytics page view:', url);
  }
}

export class GoogleAnalyticsHandler {
  constructor(ga) {
    if (typeof ga !== 'function') {
      throw new Error('Variable `ga` missing for Google Analytics');
    }
    this.ga = ga;
  }
  trackPageView(url) {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications#tracking_virtual_pageviews
    this.ga('set', 'page', url);
    this.ga('send', 'pageview');
  }
}

export class FacebookPixelHandler {
  constructor(fbq) {
    if (typeof fbq !== 'function') {
      throw new Error('Variable `fbq` missing for Facebook Pixel');
    }
    this.fbq = fbq;
  }
  trackPageView(url) {
    const time = new Date();
    this.fbq('track', "PageView");
    this.fbq('trackCustom', 'CustomPageView', {url, time});
  }
}
