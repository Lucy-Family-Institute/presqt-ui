import axios from 'axios';
import FileSaver from 'file-saver';

import { apiURLBase } from '../config';

/**
 * Resource Collection Endpoint
 **/
export function getTargetResources(sourceTarget, sourceTargetToken) {
  return axios.get(`${apiURLBase}targets/${sourceTarget}/resources/`, {
    headers: { 'presqt-source-token': sourceTargetToken }
  });
}

/**
 * Resource Collection Endpoint With Search Parameter
 **/
export function getTargetResourcesSearch(sourceTarget, sourceTargetToken, search) {
  const searchValueNoSpaces = search.replace(/ /g, "+");

  return axios.get(`${apiURLBase}targets/${sourceTarget}/resources?title=${searchValueNoSpaces}`, {
    headers: { 'presqt-source-token': sourceTargetToken }
  });
}

/**
 * Resource Detail Endpoint
 **/
export function getResourceDetail(resource, sourceTargetToken) {
  const resourceDetailURL = resource.links.find(link => link.name === 'Detail').link;
  return axios.get(resourceDetailURL, {headers: { 'presqt-source-token': sourceTargetToken }
  });
}


/**
 * Resource Download Endpoint
 **/
export function getResourceDownload(resource, sourceTargetToken) {
  const resourceDownloadURL = resource.links.find(link => link.name === 'Download').link;
  return axios.get(resourceDownloadURL, { headers: { 'presqt-source-token': sourceTargetToken } });
}

export function resourceDownloadJob(downloadJobURL, sourceTargetToken) {
  return axios.get(downloadJobURL, { headers: { 'presqt-source-token': sourceTargetToken }, responseType: 'blob' });
}
