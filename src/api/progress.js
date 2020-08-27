import axios from 'axios';
import { apiURLBase } from '../config';

// Get progress for collection endpoint
export function getCollectionProgress(targetToken) {
    return axios.get(`${apiURLBase}job_status/collection/`, {
      headers: {'presqt-source-token': targetToken}
    });
}

// Get progress for download process
export function getDownloadProgress(targetToken) {
  return axios.get(`${apiURLBase}job_status/download/`, {
    headers: {'presqt-source-token': targetToken}
  });
}

// Get progress for upload process
export function getUploadProgress(destinationToken) {
  return axios.get(`${apiURLBase}job_status/upload/`, {
    headers: {'presqt-destination-token': destinationToken}
  });
}

// Get progress for transfer process
export function getTransferProgress(destinationToken, targetToken) {
  return axios.get(`${apiURLBase}job_status/transfer/`, {
    headers: {
      'presqt-destination-token': destinationToken,
      'presqt-source-token': targetToken
    }
  });
}
