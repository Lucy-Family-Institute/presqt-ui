import axios from "axios";
import {apiURLBase} from "../config";

/**
 * Resource Download Endpoint
 **/
export function getResourceDownload(resource, targetToken, isService, emailAddress) {
  const resourceDownloadURL = resource.links.find(link => link.name === 'Download').link;
  console.log(emailAddress);
  return axios.get(resourceDownloadURL, {
    headers: {
      'presqt-source-token': targetToken,
      'presqt-email-opt-in': emailAddress
    }
  });
}

/**
 * Resource Download Job ZIP Endpoint
 **/
export function resourceDownloadJobZIP(downloadJobURL, targetToken) {
  return axios.get(downloadJobURL, {
    headers: {'presqt-source-token': targetToken},
    responseType: 'blob'
  });
}

/**
 * Resource Download Job JSON Endpoint
 **/
export function resourceDownloadJobJSON(downloadJobURL, targetToken) {
  return axios.get(downloadJobURL, {
    headers: {'presqt-source-token': targetToken}
  });
}

/**
 * Cancel Download Job Endpoint
 **/
export function cancelResourceDownloadJob(targetToken) {
  return axios.patch(`${apiURLBase}job_status/download/`, null, {headers: {'presqt-source-token': targetToken}});
}