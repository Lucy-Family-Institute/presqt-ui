import axios from 'axios';
import { apiURLBase } from '../config';

/**
 * Resource Collection Endpoint
 **/
export function getTargetResources(target, targetToken) {
  return axios.get(`${apiURLBase}targets/${target}/resources/`, {
    headers: { 'presqt-source-token': targetToken }
  });
}

/**
 * Resource Collection Endpoint With Search Parameter
 **/
export function getTargetResourcesSearch(target, targetToken, search) {
  const searchValueNoSpaces = search.replace(/ /g, "+");

  return axios.get(`${apiURLBase}targets/${target}/resources?title=${searchValueNoSpaces}`, {
    headers: { 'presqt-source-token': targetToken }
  });
}

/**
 * Resource Detail Endpoint
 **/
export function getResourceDetail(resource, targetToken) {
  const resourceDetailURL = resource.links.find(link => link.name === 'Detail').link;
  return axios.get(resourceDetailURL, {headers: { 'presqt-source-token': targetToken }
  });
}

/**
 * Resource Download Endpoint
 **/
export function getResourceDownload(resource, targetToken) {
  const resourceDownloadURL = resource.links.find(link => link.name === 'Download').link;
  return axios.get(resourceDownloadURL, { headers: { 'presqt-source-token': targetToken } });
}

/**
 * Resource Download Job Endpoint
 **/
export function resourceDownloadJob(downloadJobURL, targetToken) {
  return axios.get(downloadJobURL, { headers: { 'presqt-source-token': targetToken },
    responseType: 'blob' });
}

/**
 * Cancel Download Job Endpoint
 **/
export function cancelResourceDownloadJob(ticketNumber, targetToken) {
  return axios.patch(`${apiURLBase}downloads/${ticketNumber}/`, null, { headers: { 'presqt-source-token': targetToken }});
}

/**
 * Resource Upload Endpoint
 **/
export function postResourceUpload(target, file, duplicateAction, resourceToUploadTo, targetToken) {
  let resourceUploadURL;
  if (!resourceToUploadTo) {
    resourceUploadURL = `${apiURLBase}targets/${target}/resources/`;
  }
  else {
    resourceUploadURL = resourceToUploadTo.links.find(link => link.name === 'Upload').link;
  }
  const bodyFormData = new FormData();

  bodyFormData.set('presqt-file', file);
  return axios.post(resourceUploadURL,
    bodyFormData,
    { headers: { 'presqt-destination-token': targetToken,
        'presqt-file-duplicate-action': duplicateAction }}
    )
}

/**
 * Resource Upload Job Endpoint
 **/
export function resourceUploadJob(uploadJobURL, targetToken) {
  return axios.get(
    uploadJobURL,
    { headers: { 'presqt-destination-token': targetToken }});
}

/**
 * Cancel Upload Job Endpoint
 **/
export function cancelResourceUploadJob(ticketNumber, targetToken) {
  return axios.patch(`${apiURLBase}uploads/${ticketNumber}/`, null, { headers: { 'presqt-destination-token': targetToken }});
}

/**
 * Resource Transfer Endpoint
 **/
export function postResourceTransfer(destinationTarget, destinationToken, resource, duplicateAction,
                                   resourceToUploadTo, target, targetToken) {
  let resourceUploadURL;
  if (!resourceToUploadTo) {
    resourceUploadURL = `${apiURLBase}targets/${destinationTarget}/resources/`;
  }
  else {
    resourceUploadURL = `${apiURLBase}targets/${destinationTarget}/resources/${resourceToUploadTo}`;
  }
  const bodyFormData = new FormData();

  bodyFormData.set('source-target-name', target);
  bodyFormData.set('source_resource_id', resource);
  
  return axios.post(resourceUploadURL,
    bodyFormData,
    {
      headers: {
        'presqt-destination-token': destinationToken,
        'presqt-source-token': targetToken,
        'presqt-file-duplicate-action': duplicateAction,
        'Content-Type': 'application/json'
      }
    }
    )
}

/**
 * Resource Transfer Job Endpoint
 **/
export function resourceTransferJob(transferJobURL, targetToken) {
  return axios.get(
    transferJobURL,
    { headers: { 'presqt-destination-token': targetToken }});
}

/**
 * Cancel Upload Job Endpoint
 **/
export function cancelResourceTransferJob(ticketNumber, targetToken) {
  return axios.patch(`${apiURLBase}transfers/${ticketNumber}/`,
    null, { headers: { 'presqt-destination-token': targetToken } });
}