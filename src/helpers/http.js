import config from '../config/index';
import ApiException from '../services/ApiException';

const HttpHelper = {

  rejectError: (err, reject) => {
    if (err.toString().includes('Network Error')) {
      return reject(new ApiException(null, 'unreachable.server'));
    }
    console.log('error', err);
    reject(ApiException.fromAxios(err));
  },

  getEndpointUri: endpoint => {
    return config.get().apiBaseUri.concat(endpoint);
  }

};

export default HttpHelper;
