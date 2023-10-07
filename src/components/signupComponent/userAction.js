import { toast } from "react-toastify";
import {
  getNewAccessJwtAxios,
  getUserAxios,
  loginAxios,
  logoutAxios,
  signUpAxios,
  verifyUserAxios,
} from "../helper/axios";
import { setUser } from "../customerComponent/customerSlice";

export const postAccount = async (obj) => {
  const pending = signUpAxios(obj);
  toast.promise(pending, {
    pending: "processing...",
  });
  const { status, message } = await pending;

  toast[status](message);
};

export const verifyUser = async (data) => {
  const pending = verifyUserAxios(data);

  toast.promise(pending, {
    pending: "Loading...",
  });
  const { status, message } = await pending;

  toast[status](message);
  if (status === "success") {
    return status;
  }
};

const getUser = () => async (dispatch) => {
  const { status, user } = await getUserAxios();

  if (status === "success") dispatch(setUser(user));
};
export const loginAction = (user) => async (dispatch) => {
  const { status, message, sessionJWT, refreshJWT } = await loginAxios(user);

  toast[status](message);
  if (status === "success") {
    localStorage.setItem("refreshJWT", refreshJWT);
    sessionStorage.setItem("accessJWT", sessionJWT);
    dispatch(getUser());
  }
};

export const autoLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  if (accessJWT) {
    return dispatch(getUser());
  }
  const refreshJWT = localStorage.getItem("refreshJWT");
  if (refreshJWT) {
    const { accessJWT } = await getNewAccessJwtAxios();
    if (accessJWT) {
      sessionStorage.setItem("accessJWT", accessJWT);
      return dispatch(getUser());
    }
  }
};

export const signoutAction = async (id) => {
  await logoutAxios(id);
};
