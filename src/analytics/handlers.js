export class LoggingAnalyticsHandler {
  trackPageView(url) {
    console.log('Analytics page view:', url);
  }
}

// Google Analytics 4 (GA4) using gtag.js script, which is included in server/rendered.js
// Note: the script is only available locally when running "yarn run dev-server"
export class GoogleAnalyticsHandler {
  constructor(gtag) {
    if (typeof gtag !== 'function') {
      throw new Error('Variable `gtag` missing for Google Analytics');
    }
    this.gtag = gtag;
  }
  trackPageView(canonicalPath, previousPath) {
    // GA4 property. Manually send page_view events
    // https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications
    // Note 1: You should turn "Enhanced measurement" off.
    //         It attaches own listeners to elements and that breaks in-app navigation.
    // Note 2: If previousPath is null (just after page load), gtag script sends page_view event automatically.
    //         Only in-app navigation needs to be sent manually from SPA.
    // Note 3: Timeout is needed because gtag script picks up <title>,
    //         and location change event happens before initial rendering.
    if (previousPath) {
      window.setTimeout(() => {
        this.gtag('event', 'page_view', {
          page_path: canonicalPath,
        });
      }, 300);
    }
  }
}
