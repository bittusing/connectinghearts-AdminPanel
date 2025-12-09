const envObj = process.env;

const appConfig = {
  apiUrl: envObj.REACT_APP_APIURL,
  authUrl: envObj.REACT_APP_AUTH_URL,
  appId: envObj.REACT_APP_ID,
  appKey: envObj.REACT_APP_KEY,
  appCluster: envObj.REACT_APP_CLUSTER,
  secretKey: envObj.REACT_APP_PASSWORD_ENCRYPTION_SECRET_KEY,
  tenantId: envObj.REACT_APP_SSO_TENANT_ID,
  ssoClientId: envObj.REACT_APP_CLIENT_ID,
  clientId: envObj.REACT_APP_CLIENT_ID,
  baseUrl: envObj.REACT_APP_BASEURL,
  devApiUrl: envObj.REACT_APP_DEV_APIURL,
};

export default appConfig;
