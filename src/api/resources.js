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
  return axios.get('https://localhost/api_v1/targets/osf/resources/poop.zip/', { headers: { 'presqt-source-token': sourceTargetToken } });
}

export function resourceDownloadJob(downloadJobURL, sourceTargetToken) {
  return axios.get(downloadJobURL, { headers: { 'presqt-source-token': sourceTargetToken }, responseType: 'blob' });
}

/**
 * Resource Download Endpoint
 **/
// export function initiateResourceDownload(
//   resourceDownloadURL,
//   sourceTargetToken
// ) {
//   const closure = url => {
//     axios
//       .get(url, {
//         headers: { 'presqt-source-token': sourceTargetToken },
//         responseType: 'blob',
//         timeout: 10000
//       })
//       .then(response => FileSaver(response.data, 'textname.txt'));
//   };

//   axios
//     .get(resourceDownloadURL, {
//       headers: { 'presqt-source-token': sourceTargetToken }
//     })
//     .then(response => {
//       setInterval(closure, 5000, response.data.download_job);
//     });
// }
