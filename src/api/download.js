import axios from "axios";
import {apiURLBase} from "../config";

/**
 * Resource Download Endpoint
 **/
export function getResourceDownload(resource, targetToken) {
  const resourceDownloadURL = resource.links.find(link => link.name === 'Download').link;
  return axios.get(resourceDownloadURL, {headers: {'presqt-source-token': targetToken}});
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
export function cancelResourceDownloadJob(ticketNumber, targetToken) {
  return axios.patch(`${apiURLBase}downloads/${ticketNumber}/`, null, {headers: {'presqt-source-token': targetToken}});
}