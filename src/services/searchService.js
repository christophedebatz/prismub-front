import axios from "axios";
import HttpHelper from '../helpers/http';
import { config } from '../config/index';
import ApiException from './ApiException';

const searchService = {

  searchRepositories: search => {
    return new Promise((resolve, reject) => {
      if (search) {
        const uri = HttpHelper.getEndpointUri('/repositories');
        return axios
          .get(uri, { params: { search } })
          .then(response => resolve(response.data))
          .catch(err => HttpHelper.rejectError(err, reject));
      }
      return reject(new ApiException(400, 'empty.search.input'));
    });
  }

}

export default searchService;
