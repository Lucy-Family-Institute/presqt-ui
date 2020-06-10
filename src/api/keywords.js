import axios from "axios";

export function getInitialKeywords(resource, targetToken) {
  const resourceDetailURL = resource.links.find((link) => link.name === "Detail").link;
  
  return axios.get(`${resourceDetailURL}keywords/`, {
    headers: { "presqt-source-token": targetToken },
  });
}

export function sendEnhancedKeywords(resource, targetToken, keywords) {
  const resourceUploadURL = resource.links.find((link) => link.name === "Upload").link;

  return axios.post(`${resourceUploadURL}keywords/`, {"keywords": keywords}, {
    headers: { "presqt-source-token": targetToken },
  });
}
