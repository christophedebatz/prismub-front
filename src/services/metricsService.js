import axios from "axios";
import HttpHelper from '../helpers/http';
import { config } from '../config/index';
import ApiException from './ApiException';

const metricsService = {

  getCommitsMetrics: (repoOwner, repoName, page) => {
    return new Promise((resolve, reject) => {
      if (repoOwner && repoName) {
        const route = `/users/${repoOwner}/repositories/${repoName}/metrics`;
        const uri = HttpHelper.getEndpointUri(route);
        return axios
          .get(uri, { params: { page } })
          .then(response => resolve(response.data))
          .catch(err => HttpHelper.rejectError(err, reject));
      }
      return reject(new ApiException(400, 'empty.metrics.input'));
    });
  }

}

export default metricsService;
