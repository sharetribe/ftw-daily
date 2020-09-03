import ReactGA from 'react-ga'

export const initAnalytics = (userId) => {
  if (window) {
    ReactGA.initialize('UA-86271300-1', {
      debug: true,
      titleCase: false,
      gaOptions: {
        userId: userId || 'not_set'
      }
    })
  }
}

export const trackEvent = (category, action, value) => {
  ReactGA.event({
    category,
    action,
    value
  })
}
