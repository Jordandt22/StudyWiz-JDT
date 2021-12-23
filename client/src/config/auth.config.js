export const getProxyAuthPassword = () => {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  return "Basic " + process.env[`REACT_APP_PROXY_PASSWORD_` + randomNum];
};
