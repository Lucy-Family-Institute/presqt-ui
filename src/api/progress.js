import axios from 'axios';
import { apiURLBase } from '../config';

export function getCollectionProgress(targetToken) {
    return axios.get(`${apiURLBase}job_status/collection/`, {
      headers: {'presqt-source-token': targetToken}
    });
}