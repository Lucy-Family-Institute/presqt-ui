import axios from 'axios';

import { apiURLBase } from '../config';

export function getSourceTargetResources(sourceTarget, sourceTargetToken) {
  return axios.get(`${apiURLBase}targets/${sourceTarget}/resources/`, {
    headers: { 'presqt-source-token': sourceTargetToken }
  });
}
