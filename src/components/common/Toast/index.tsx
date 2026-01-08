// import './toast.scss'
import toast from "react-hot-toast";
import type { Renderable } from "react-hot-toast";

const defaultOptions = {
  position: "top-center" as const,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "toster-bar",
  style: {
    fontSize: "16px",
  },
};

class Toaster {
  success = (message: string, id?: string) => {
    const toastId = id || "success";
    toast.success(message, { ...defaultOptions, id: toastId });
  };

  error = (message: string, id?: string) => {
    const toastId = id || "error";
    toast.error(message, { ...defaultOptions, id: toastId });
  };

  info = (message: string, id?: string) => {
    const toastId = id || "info";
    toast(message, { ...defaultOptions, id: toastId, icon: "ℹ️" });
  };

  promise = (
    method: Promise<unknown> | (() => Promise<unknown>),
    data: { loading: Renderable; success: Renderable; error: Renderable },
    id?: string
  ) => {
    const toastId = id || "promise";
    toast.promise(method, data, { ...defaultOptions, id: toastId });
  };
}

export default new Toaster();
