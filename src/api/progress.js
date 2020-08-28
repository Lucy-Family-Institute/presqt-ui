import axios from 'axios';
import { apiURLBase } from '../config';

// Get progress for collection endpoint
export function getCollectionProgress(targetToken) {
    return axios.get(`${apiURLBase}job_status/collection/`, {
      headers: {'presqt-source-token': targetToken}
    });
}
