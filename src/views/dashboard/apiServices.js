

import { deleteRequest, getRequest, postRequest } from "../../configs/apis/axiosService";

export const getAllUsers = async (type) => {
  let url = `chAdmin/getAllUsers/${type}`
  let response = await getRequest(url);
  return response;
};

export const getAllMembership = async (type) => {
  let url = `dashboard/getMembershipList`
  let response = await getRequest(url);
  return response;
};

export const grantMembership = async (body) => {
  let url = `chAdmin/grantMembership`
  let response = await postRequest(url, body);
  return response;
};

export const getLookupData = async () => {
  let url = 'lookup'
  let response = await getRequest(url);
  return response;
};


export const getCountryLabel = async () => {
  let url = 'lookup/getCountryLookup'
  let response = await getRequest(url);
  return response;
};

export const getStateLookup = async (country) => {
  let url = `lookup/getStateLookup/${country}`
  let response = await getRequest(url);
  return response;
};
export const getCityLookup = async (state) => {
  let url = `lookup/getCityLookup/${state}`
  let response = await getRequest(url);
  return response;
};

export const getVerifyUser = async (id) => {
  let url = `chAdmin/verifyUser/${id}`
  let response = await getRequest(url);
  return response;
};

export const deleteUser = async (phone) => {
  let url = `auth/deleteUser/${phone}`
  let response = await deleteRequest(url);
  return response;
};
