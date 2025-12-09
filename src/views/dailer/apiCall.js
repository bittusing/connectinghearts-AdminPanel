import { getRequest, postRequest } from "../../configs/apis/axiosService";
import { apiURL } from "../../constants/apiConstants";

export const getMemberData = async (clientId, memberId) => {
  let requestBody = {
    clientId: clientId,
    memberId: memberId,
  };
  let response = await postRequest(apiURL.getMemberInfo, requestBody);
  return response;
};
export const getVisitorData = async () => {
  let response = await postRequest(apiURL.getMemberVisitInfo);
  return response;
};
export const getDispositionLookup = async (clientId) => {
  let action = "?clientId=" + clientId;
  let response = await postRequest(apiURL.getDispositionLookup + action);
  return response;
};
export const getCreateCall = async (clientId, memberId) => {
  let payload = {
    clientId: clientId,
    campaignName: "",
    interactionId: "",
    memberId: memberId,
  };
  let response = await postRequest(apiURL.createCall, payload);
  return response;
};
export const getCallHistory = async (clientId, memberId) => {
  let payload = {
    clientId: clientId,
    memberId: memberId,
  };
  let response = await postRequest(apiURL.getMemberCallHistory, payload);
  return response;
};

export const getAccounts = async (clientId, memberId) => {
  let response = await getRequest(apiURL.getAccountProject);
  return response;
};
