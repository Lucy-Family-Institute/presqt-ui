import axios from 'axios';

import { apiURLBase } from '../config';

export function getTargets() {
  return axios.get(`${apiURLBase}targets/`);
}
