import axios from 'axios';

import { apiURLBase } from '../config';

/**
 * Target Collection Endpoint
 */
export function getTargets() {
  return axios.get(`${apiURLBase}targets/`);
}
