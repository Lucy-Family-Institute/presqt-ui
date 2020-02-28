import axios from "axios";
import {apiURLBase} from "../config";

/**
 * Resource Upload Endpoint
 **/
export function postResourceUpload(target, file, duplicateAction, resourceToUploadTo, targetToken) {
  let resourceUploadURL;
  if (!resourceToUploadTo) {
    resourceUploadURL = `${apiURLBase}targets/${target}/resources/`;
  } else {
    resourceUploadURL = resourceToUploadTo.links.find(link => link.name === 'Upload').link;
  }
  const bodyFormData = new FormData();

  bodyFormData.set('presqt-file', file);
  return axios.post(resourceUploadURL,
    bodyFormData,
    {
      headers: {
        'presqt-destination-token': targetToken,
        'presqt-file-duplicate-action': duplicateAction
      }
    }
  )
}

/**
 * Resource Upload Job Endpoint
 **/
export function resourceUploadJob(uploadJobURL, targetToken) {
  return axios.get(
    uploadJobURL,
    {headers: {'presqt-destination-token': targetToken}});
}

/**
 * Cancel Upload Job Endpoint
 **/
export function cancelResourceUploadJob(ticketNumber, targetToken) {
  return axios.patch(`${apiURLBase}uploads/${ticketNumber}/`, null, {headers: {'presqt-destination-token': targetToken}});
}