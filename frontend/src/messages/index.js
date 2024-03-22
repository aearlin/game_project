import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success = (message) =>
  toast.success(message, {
    position: "center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    fontSize: 20,
  });

export const error = (message) =>
  toast.error(message, {
    position: "center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const warning = (message) =>
  toast.warning(message, {
    position: "center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const info = (message) =>
  toast(message, {
    position: "center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
