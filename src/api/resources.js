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
  if (searchParameter === '') {
    return axios.get(`${apiURLBase}targets/${target}/resources/`, {
      headers: { 'presqt-source-token': targetToken }
    });
  }
  else if (searchParameter === 'title' || searchParameter === 'author' || searchParameter === 'keywords') {
    const searchValueNoSpaces = search.replace(/ /g, "+");
    return axios.get(`${apiURLBase}targets/${target}/resources?${searchParameter}=${searchValueNoSpaces}`, {
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
 * Resource Collection Endpoint With Page Parameter
 **/
export function getTargetResourcesPagination(url, pageNumber, targetToken) {
  const pageUrl = url.concat(pageNumber.toString());
  return axios.get(pageUrl, {headers: { 'presqt-source-token': targetToken }});
  }

/**
 * Resource Detail Endpoint
 **/
export function getResourceDetail(resource, targetToken) {
  const resourceDetailURL = resource.links.find(link => link.name === 'Detail').link;
  return axios.get(resourceDetailURL, {headers: { 'presqt-source-token': targetToken }
  });
}

