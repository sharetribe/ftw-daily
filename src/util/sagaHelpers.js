// async actions use request - success / failure pattern
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

// response format: { REQUEST: 'baseStr.REQUEST', SUCCESS: 'baseStr.SUCCESS', FAILURE: 'baseStr.FAILURE' }
export const createRequestTypes = base =>
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    // eslint-disable-next-line no-param-reassign
    acc[type] = `${base}.${type}`;
    return acc;
  }, {});
