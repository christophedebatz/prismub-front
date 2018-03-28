import axios from "axios";
import HttpHelper from '../helpers/http';
import { config } from '../config/index';
import ApiException from './ApiException';

const commitsService = {

  getCommits: (repoOwner, repoName, page) => {
    return new Promise((resolve, reject) => {
      if (repoOwner && repoName) {
        const route = `/users/${repoOwner}/repositories/${repoName}/commits`;
        const uri = HttpHelper.getEndpointUri(route);
        return axios
          .get(uri, { params: { page } })
          .then(response => resolve(response.data))
          .catch(err => HttpHelper.rejectError(err, reject));
      }
      return reject(new ApiException(400, 'empty.commits.input'));
    });
  }

}

export default commitsService;
