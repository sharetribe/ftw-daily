import { Component } from 'react';
import TagManager from 'react-gtm-module';
import routeConfiguration from '../../routeConfiguration';
import config from '../../config';


export default class GTMWrapper extends Component {
  componentDidMount(){
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const {pathname, title} = this.props;
      const route = routeConfiguration().find(({path}) => path === pathname);
      const routeName = route.name;

      const tagManagerArgs = {
        dataLayer: {
          userId: '001',
          userProject: config.siteTitle,
          page: routeName,
          event: 'pageview',
          pagePath: window.location.pathname,
          pageTitle: title,
        },
        events: {
          pageView: 'pageview',
        },
        page: {
          path: window.location.pathname,
          title: title,
          type: routeName,
        },
      };

      TagManager.dataLayer(tagManagerArgs);
    }
  }

  render(){
    return this.props.children;
  }
}