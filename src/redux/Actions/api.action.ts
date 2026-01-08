// import { useDispatch } from "react-redux";
// // import { Dispatch } from "redux";

// // import {
// //   apiCallGet,
// //   apiCallPost,
// //   manageErrorConnection,
// //   openNewTab,
// // } from "../../Services/axios.service";
// // import { APIURL } from "../../utils/Utils";
// import { buttonLoader, loader } from "../Slices/loader.slice";
// import { logoutUser } from "../Slices/user.slice";
// import type { Dispatch } from "react";
// import {
//   apiCallGet,
//   apiCallPost,
//   manageErrorConnection,
//   openNewTab,
// } from "../../services/axios.service";
// import { APIURL } from "../../Utills/Utils";

// /**CALL API'S GET METHODS */
// export const callApiGetMethod = (
//   method: string,
//   parms: any = {},
//   loading = true,
//   buttonLoaderKey: any = null
// ) => {
//   return (dispatch: Dispatch<any> = useDispatch()) =>
//     new Promise(async (resolve, reject) => {
//       /**SHOW LOADER */
//       if (loading) {
//         dispatch(loader(loading));
//       }

//       if (buttonLoaderKey)
//         dispatch(buttonLoader({ [buttonLoaderKey]: buttonLoaderKey }));

//       /**CALL METHOD */
//       apiCallGet(APIURL[method], parms)
//         .then((result) => {
//           if (loading) dispatch(loader(false));
//           if (buttonLoaderKey)
//             dispatch(buttonLoader({ [buttonLoaderKey]: false }));
//           resolve(result);
//         })
//         .catch((err) => {
//           if (loading) dispatch(loader(false));
//           if (buttonLoaderKey)
//             dispatch(buttonLoader({ [buttonLoaderKey]: false }));
//           reject(err);
//         });
//     });
// };

// /**CALL API'S SEND METHOD */
// export const callApiPostMethod = (
//   method: string,
//   data: any = {},
//   parms: any = {},
//   showtoaster = false

// ) => {
//   return (dispatch: Dispatch<any> = useDispatch()) =>
//     new Promise(async (resolve, reject) => {
//       /**SHOW LOADER */
//       dispatch(loader(true));

//       /**CALL METHOD */
//       apiCallPost(APIURL[method], data, parms ,showtoaster)
//         .then((result) => {
//           dispatch(loader(false));
//           resolve(result);
//         })
//         .catch((err) => {
//           dispatch(loader(false));
//           reject(err);
//         });
//     });
// };

// export const openInNewTab = (method: string, parms: any = {}) => {
//   return (dispatch: Dispatch<any> = useDispatch()) =>
//     new Promise(async (resolve, reject) => {
//       Object.keys(parms).forEach((key) =>
//         parms[key] === undefined || parms[key] === null || parms[key] === ""
//           ? delete parms[key]
//           : {}
//       );

//       openNewTab(APIURL[method], parms)
//         .then((result) => {
//           resolve(result);
//         })
//         .catch((err) => {
//           manageErrorConnection(err);
//           if (err?.response?.status === 401) {
//             setTimeout(function () {
//               dispatch(logoutUser());
//             }, 2000);
//           }
//           reject(err);
//         });
//     });
// };
