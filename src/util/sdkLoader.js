import * as importedSdk from 'sharetribe-sdk';

let exportSdk;

const isServer = () => typeof window === 'undefined';

if (isServer()) {
  // Use eval to skip webpack from bundling SDK in Node
  // eslint-disable-next-line no-eval
  exportSdk = eval('require')('sharetribe-sdk');
} else {
  exportSdk = importedSdk;
}

const {
  createInstance,
  types,
} = exportSdk;

export { createInstance, types };
