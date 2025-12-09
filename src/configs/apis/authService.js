import Axios from "axios";
import appConfig from "../appConfig";
import { toast } from "react-toastify";

export async function loginUser(credentials) {
 
  let url = `${appConfig.baseUrl}auth/login`;
  let body =credentials;  
  try {
    let resp = await Axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });
    if (resp.data?.status === 'success') { 
      localStorage.setItem("access_token", resp?.data?.token); 
      localStorage.setItem("user_id", resp?.data?.id); 
      return resp.data;
    }
  } catch (error) { 
    toast.error(error.response?.data?.err);
  }
}

export async function validateToken() {
  let accessToken = localStorage.getItem("access_token");
  let url = `${appConfig.authUrl}validateToken`;
  try {
    let response = await Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {  
      return response?.data;
    }
  } catch (error) {  
    console.log(error);
      localStorage.clear();
      return error; 
  }
}

// export async function generateAccessToken() {
//   let refreshToken = localStorage.getItem("refresh_token");
//   let url = `${appConfig.authUrl}user/authentication${appConfig.appId}`;
//   let body = {
//     loginMethod: "JWT",
//     token: refreshToken,
//   };
//   try {
//     let response = await Axios.post(url, body, {
//       headers: { "Content-Type": "application/json" },
//     });
//     console.log(response);
//     localStorage.setItem("access_token", response?.data?.result?.access_token); 
//     return response
//   } catch (error) {
//     return "refresh_expired";
//   }
// }
