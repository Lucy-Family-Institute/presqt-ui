import axios from 'axios';
import {apiURLBase} from '../config';

/**
 * Resource Collection Endpoint
 **/
export function getTargetResources(target, targetToken) {
    return axios.get(`${apiURLBase}targets/${target}/resources/`, {
      headers: {'presqt-source-tofken': targetToken}
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

