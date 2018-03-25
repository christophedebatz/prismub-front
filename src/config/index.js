const env = {
  dev: {
    apiBaseUri: 'http://localhost:3001'
  },
  prod: {
    apiBaseUri: 'http://localhost:3001'
  }
};

const config = {
  get: () => {
    return process.env && process.env.NODE_ENV === 'prod' ? env.prod : env.dev;
  }
};

export default config;
