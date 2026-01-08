// import axios from "axios";
// import store from "../redux/Store";
// // import { API_HOST } from "../utils/Constants";
// import { toast } from "react-toastify";
// import { API_HOST } from "../Utills/Constant";
// import {
//   clearCookies,
//   encryptData,
//   formatUrl,
//   resetRedux,
// } from "./common.service";

// export const storeInstance = store;
// axios.defaults.baseURL = API_HOST;

// /** Get current browser route (safe for non-browser environments) */
// export const getCurrentRoute = (): string => {
//   if (typeof window === "undefined") return "";
//   const { pathname, search, hash } = window.location;
//   return `${pathname}${search}${hash}`;
// };

// /**AXIOS INTERCEPTOR */
// axios.interceptors.request.use(
//   (config) => {
//     const admintoken = storeInstance.getState()?.admin?.adminData?.token;
//     const userToken = storeInstance.getState()?.user?.userData?.token;

//     let validToken = "";
//     if (getCurrentRoute().startsWith("/admin")) {
//       validToken = admintoken;
//     } else {
//       validToken = userToken;
//     }

//     // const adminType = storeInstance.getState().admin.adminType;
//     // const token = encryptData(walletAddress);
//     config.headers["Authorization"] = `Bearer ${validToken}`;
//     config.headers["Content-Type"] = "application/json";
//     config.headers["Access-Control-Allow-Origin"] = "*";
//     // config.headers["AdminType"] = adminType;
//     // config.headers["wallet"] = walletAddress;
//     return config;
//   },
//   (error) => {
//     console.log("error", error);
//     return Promise.reject(error);
//   }
// );

// /**HANDLE AXIOS RESPONSE */
// axios.interceptors.response.use(
//   async (response) => {
//     // response.data = await decrypt(response.data);
//     // response.data = await response?.data;

//     return response;
//   },
//   (error) => {
//     if (!error?.response) {
//       toast.error("Server not responding. Please try again later.");
//       return Promise.reject(error);
//     } else {
//       return manageErrorConnection(error);
//     }
//   }
// );
// /**HANDLE AXIOS ERROR */
// export function manageErrorConnection(err: any) {
//   if (
//     err.response &&
//     err.response.status >= 400 &&
//     err.response.status <= 500
//   ) {
//     if (err.response.status == 401) {
//       resetRedux();
//       clearCookies();
//       return Promise.reject(err.response?.data?.message);
//     }
//     console.log('err.response?.data?.message', err.response?.data?.message)
//     toast.error(err.response?.data?.message);
//     return Promise.reject(err.response?.data?.message);
//   } else if (err.code === "ECONNREFUSED") {
//     toast.error("ECONNREFUSED");
//     return Promise.reject(err);
//   } else {
//     return Promise.reject(err);
//   }
// }

// /**HANDLE AXIOS SUCCESS */
// function handleSuccess(res: any) {
//   if (res.status === 200 || res.status === 201)
//     res?.data?.message && toast.success(res.data.message);
//   else {
//     res?.data?.message && toast.info(res.data.message);
//   }
// }
// /**METHOD FOR POST API */
// export const apiCallPost = <TResponse = unknown>(
//   url: any,
//   data: Record<string, unknown>,
//   params: Record<string, unknown> = {},
//   showtoaster = false
// ): Promise<TResponse> =>
//   new Promise<TResponse>((resolve, reject) => {
//     // const encParams = params ? { query: encryptData(params) } : { query: "" };

//     axios
//       .post(formatUrl(url, params), {
//         // data: encryptData(JSON.stringify(data)),
//         ...data,
//       })
//       .then((res) => {
//         if (showtoaster && !res?.data?.error) handleSuccess(res);
//         resolve(res.data as TResponse);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });

// /**METHOD FOR CALL API */
// export const apiCallGet = (url: any, params = {}) =>
//   new Promise((resolve) => {
//     // const encParams = params
//     //   ? { query: encryptData(JSON.stringify(params)) }
//     //   : { query: "" };

//     axios
//       .get(formatUrl(url, params))
//       .then((res) => {
//         resolve(res?.data);
//       })
//       .catch((error) => {
//         resolve(error);
//       });
//   });

// /**METHOD FOR CALL API */
// export const apiCallPatch = (url: any, data: any, params = {}) =>
//   new Promise((resolve, reject) => {
//     const encParams = params ? { query: encryptData(data) } : { query: "" };

//     axios
//       .patch(formatUrl(url, encParams), {
//         data: encryptData(JSON.stringify(data)),
//       })
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });

// /**METHOD FOR DELETE API */
// export const apiCallDelete = (url: any, _data: any, params = {}) =>
//   new Promise((resolve, reject) => {
//     const encParams = params
//       ? { query: encryptData(JSON.stringify(params)) }
//       : { query: "" };

//     axios
//       .delete(formatUrl(url, encParams))
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });

// export const openNewTab = (url: string, params: Record<string, unknown>) =>
//   new Promise<void>(async (resolve, reject) => {
//     try {
//       // Use axios so the request goes through interceptors (adds Authorization header)
//       const response = await axios.get(formatUrl(API_HOST + url, params), {
//         responseType: "blob",
//         // If you prefer to pass header manually instead of interceptor, uncomment below:
//         // headers: {
//         //   Authorization: `Bearer ${storeInstance.getState()?.user?.userData?.access_token}`,
//         // },
//       });

//       const contentDisposition = response.headers["content-disposition"] as
//         | string
//         | undefined;
//       const suggestedFilename =
//         contentDisposition?.split("filename=")?.[1]?.replace(/"/g, "") ||
//         "export.csv";

//       const blob = new Blob([response.data], {
//         type: "text/csv;charset=utf-8;",
//       });
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.download = suggestedFilename;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(downloadUrl);
//       resolve();
//     } catch (error) {
//       reject(error);
//     }
//   });
