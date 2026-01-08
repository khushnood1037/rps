// // services/socketService.ts
// import { io, Socket } from "socket.io-client";
// import { SOCKET_URL } from "../Utills/Constant";
// // import { SOCKET_URL_SERVIC } from "../utils/Constants";

// // const SOCKET_U = SOCKET_URL;

// let socket: Socket | null = null;
// // console.log("SOCKET_URL", SOCKET_URL);
// export const initializeSocket = (walletAddress?: string): Socket => {
//   if (!socket) {
//     socket = io(SOCKET_URL, {
//       transports: ["websocket"],
//       auth: {
//         walletAddress: walletAddress, // if needed
//       },
//     });

//     socket.on("connect", () => {
//       // console.log("Connected:", socket?.id);
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from server");
//     });
//   }
//   return socket;
// };

// export const getSocket = () => socket;

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };
