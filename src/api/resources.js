import axios from 'axios';
import {apiURLBase} from '../config';

/**
 * Resource Collection Endpoint
 **/
export function getTargetResources(target, targetToken) {
    return axios.get(`${apiURLBase}targets/${target}/resources/`, {
      headers: {'presqt-source-token': targetToken}
    });
}

/**
 * Resource Collection Endpoint With Search Parameter
 **/
export function getTargetResourcesSearch(target, targetToken, search, searchParameter) {
  const formatSearchParameter = searchParameter.toLowerCase();
  if (formatSearchParameter === 'title' || formatSearchParameter === 'author') {
    const searchValueNoSpaces = search.replace(/ /g, "+");

    return axios.get(`${apiURLBase}targets/${target}/resources?${formatSearchParameter}=${searchValueNoSpaces}`, {
      headers: { 'presqt-source-token': targetToken }
    });
  }
  else {
    return axios.get(`${apiURLBase}targets/${target}/resources?${searchParameter}=${search}`, {
      headers: { 'presqt-source-token': targetToken }
    });
  }
}

/**
 * Resource Detail Endpoint
 **/
export function getResourceDetail(resource, targetToken) {
  const resourceDetailURL = resource.links.find(link => link.name === 'Detail').link;
  return axios.get(resourceDetailURL, {headers: { 'presqt-source-token': targetToken }
  });
}

