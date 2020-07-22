// export const apiURLBase = `https://presqt-qa.crc.nd.edu/api_v1/`;
export const apiURLBase = `https://${process.env.REACT_APP_API_SERVER}/${
  process.env.REACT_APP_API_URL_ROOT
  }/`;
export const githubToken = process.env.REACT_APP_GITHUB_KEY;
export const serverBase = `https://${process.env.REACT_APP_API_SERVER}/`;
