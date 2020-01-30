import axios from 'axios';
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

/**
 * Resource Download Job Endpoint
 **/
export function resourceDownloadJob(downloadJobURL, sourceTargetToken) {
  return axios.get(downloadJobURL, { headers: { 'presqt-source-token': sourceTargetToken },
    responseType: 'blob' });
}

/**
 * Resource Upload Endpoint
 **/
export function postResourceUpload(sourceTarget, file, duplicateAction, selectedInSource, sourceTargetToken) {
  let resourceUploadURL;
  if (!selectedInSource) {
    resourceUploadURL = `${apiURLBase}targets/${sourceTarget}/resources/`;
  }
  else {
    resourceUploadURL = selectedInSource.links.find(link => link.name === 'Upload').link;
  }
  const bodyFormData = new FormData();

  bodyFormData.set('presqt-file', file);
  return axios.post(resourceUploadURL,
    bodyFormData,
    { headers: { 'presqt-destination-token': sourceTargetToken,
        'presqt-file-duplicate-action': duplicateAction }}
    )
}

/**
 * Resource Upload Job Endpoint
 **/
export function resourceUploadJob(uploadJobURL, sourceTargetToken) {
  return axios.get(
    uploadJobURL,
    { headers: { 'presqt-destination-token': sourceTargetToken }});
}