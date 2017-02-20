const env = process.env.NODE_ENV;
const dev = env !== 'production';

const config = {
  env,
  dev,
  sdk: { clientId: '08ec69f6-d37e-414d-83eb-324e94afddf0', baseUrl: 'http://localhost:8088' },
};

export default config;
