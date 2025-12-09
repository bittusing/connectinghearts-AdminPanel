import appConfig from "../../configs/appConfig";
import { getRequest, postRequest } from "../../configs/apis/axiosService";
import { apiURL } from "../../constants/apiConstants";

const pcpOptions = `${apiURL.getPcp}`;

const healthOptions = `${apiURL.getHealthplan}`;
const stateOptions = `${apiURL.getState}`;
const operatorOptionsURL = `${apiURL.getLookUp}?lookUpType=operator`;
const visitingPhysicians = `${apiURL.getVisitingPhysician}`;
const dispositionURL = `${apiURL.getDispositionLookup}?clientId=${appConfig.clientId}`;

export const getHealthOptions = async () => {
  let response = await getRequest(healthOptions);
  return response;
};

export const getStateOptions = async () => {
  let response = await getRequest(stateOptions);
  return response;
};

export const getVisitingPhysicianOptions = async () => {
  let response = await getRequest(visitingPhysicians);
  return response;
};

export const getDisposition = async () => {
  let response = await postRequest(dispositionURL);
  return response;
};

export const getOperators = async () => {
  let response = await getRequest(operatorOptionsURL);
  return response;
};
