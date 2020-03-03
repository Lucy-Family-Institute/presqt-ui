export const apiURLBase = `https://${process.env.REACT_APP_API_SERVER}/${
  process.env.REACT_APP_API_URL_ROOT
  }/`;
export const githubToken = process.env.REACT_APP_GITHUB_KEY;

export const testTokens = {
  "osf": process.env.REACT_APP_TEST_USER_OSF,
  "curate_nd": process.env.REACT_APP_TEST_USER_CURATEND,
  "github": process.env.REACT_APP_TEST_USER_GITHUB,
  "zenodo": process.env.REACT_APP_TEST_USER_ZENODO
};

export const testTokenCommand = process.env.REACT_APP_TEST_TOKEN_COMMAND;