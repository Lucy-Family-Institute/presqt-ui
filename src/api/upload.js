import axios from "axios";
import {apiURLBase} from "../config";

/**
 * Resource Upload Endpoint
 **/
export function postResourceUpload(target, file, duplicateAction, resourceToUploadTo, targetToken, emailAddress) {
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
        'presqt-file-duplicate-action': duplicateAction,
        'presqt-email-opt-in': emailAddress
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
export function cancelResourceUploadJob(targetToken) {
  return axios.patch(`${apiURLBase}job_status/upload/`, null, {headers: {'presqt-destination-token': targetToken}});
}