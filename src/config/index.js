const env = {
  dev: {
    apiBaseUri: ''
  },
  prod: {
    apiBaseUri: ''
  }
};

const config = {
  get: () => {
    return process.env && process.env.NODE_ENV === 'prod' ? env.prod : env.dev;
  }
};

export default config;
