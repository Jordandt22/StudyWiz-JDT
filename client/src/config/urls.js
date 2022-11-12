const API_VERSION = 1;
const { REACT_APP_PROXY_SERVER_URL } = process.env;
const serverURL = REACT_APP_PROXY_SERVER_URL + `/v${API_VERSION}/api`;
export const urls = {
  USER_URI: serverURL + "/user",
  SETS_URI: serverURL + "/sets",
};
