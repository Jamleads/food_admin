import { errorToast } from "./ToastMessages";

export const reAuthenticate = (errorMessage) => {
  if (
    errorMessage === "You are not logged in, please log in to get access!" ||
    errorMessage === 401 ||
    errorMessage === 500
  ) {
    localStorage.removeItem("token");
    errorToast(errorMessage);
    window.location.href = "/";
  }
};
