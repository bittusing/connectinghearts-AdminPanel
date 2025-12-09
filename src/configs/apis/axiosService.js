import Axios from "axios";
import appConfig from "../appConfig";
import { generateAccessToken } from "./authService";
import { toast } from "react-toastify";

const apiInstance = Axios.create({
  baseURL: appConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    console.log("response success !!!!>", config);
    const request = config;
    return request;
  },
  (err) => Promise.reject(err)
);

apiInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it.
    console.log("response success =====>", response);
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const newToken = await localStorage.getItem("access_token");
        if (newToken) {
          error.config.headers["Authorization"] = `Bearer ${newToken}`;
          return apiInstance(error.config); // Retry the original request.
        } else {
          // Handle the case where the token couldn't be retrieved from localStorage.
          // You might want to redirect the user to a login page or take appropriate action.
        }
      } catch (tokenError) {
        // Handle errors related to retrieving the token.
        console.error("Token retrieval error:", tokenError);
      }
    }
    return Promise.reject(error); // For other error responses.
  }
  // async (error) => {
  //   if (error.response.status === 401) {
  //     // Handle 401 Unauthorized error here.
  //     // You can refresh your authentication token and retry the request.
  //     const newToken =  await localStorage.get("access_token") // generateAccessToken();
  //     // Update the Authorization header with the new token and retry the original request.
  //     console.log("401", newToken);

  //     error.config.headers[
  //       "Authorization"
  //     ] = `Bearer ${newToken?.data?.result?.access_token}`;
  //     return apiInstance(error.config); // Retry the original request.
  //   }
  //   return Promise.reject(error); // For other error responses.
  // }
);

export const getRequest = async (url) => {
  try {
    const response = await apiInstance.get(url);
    return response;
  } catch (e) {
    if (e?.response?.status === 400)
      toast.error(e?.response?.data?.result?.message);
    else toast.error("API failed");
    return e?.response || e;
  }
};

export const postRequest = async (url, reqBody) => {
  try {
    const response = await apiInstance.post(url, reqBody);
    return response;
  } catch (e) {
    if (e?.response?.status === 400)
      toast.error(e?.response?.data?.result?.message);
    else toast.error("API failed");

    return e?.response || e;
  }
};
export const deleteRequest = async (url, reqBody) => {
  try {
    const response = await apiInstance.delete(url, reqBody);
    return response;
  } catch (e) {
    if (e?.response?.status === 400)
      toast.error(e?.response?.data?.result?.message);
    else toast.error("API failed");

    return e?.response || e;
  }
};

// export const getRequest = async (url) => {
//   let baseURL = appConfig?.apiUrl + url;
//   try {
//     const response = await Axios.get(baseURL, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//     });
//     return response;
//   } catch (e) {
//     if (e.response.status === 401) validateToken();
//     if (e.response.status === 400) toast.error(e?.response?.data?.result?.message);
//     return e?.response || e;
//   }
// };

// export const postRequest = async (url, body) => {
//   let baseURL = appConfig?.apiUrl + url;
//   try {
//     const response = await Axios.post(baseURL, body, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//     });
//     return response;
//   } catch (e) {
//     if (e.response.status === 401) validateToken();
//     if (e.response.status === 400) toast.error(e?.response?.data?.result?.message);
//     return e?.response || e;
//   }
// };
