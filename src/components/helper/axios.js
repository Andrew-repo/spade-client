import axios from "axios";

const rootAPI =
  process.env.NODE_ENV == "production"
    ? process.env.REACT_APP_ROOTAPI
    : "http://localhost:8001";
const categoryAPI = rootAPI + "/store/api/v1/category";
const customerAPI = rootAPI + "/store/api/v1/customer";
const payment = rootAPI + "/store/api/v1/payments";
const orderAPI = rootAPI + "/store/api/v1/order";

function getSessionToken() {
  return sessionStorage.getItem("accessJWT");
}
function getRefreshToken() {
  return localStorage.getItem("refreshJWT");
}

const axiosExcecutor = async ({
  method,
  url,
  obj,
  isPrivate,
  refreshToken,
}) => {
  try {
    const token = refreshToken ? getRefreshToken() : getSessionToken();
    const headers = {
      Authorization: isPrivate ? token : null,
    };
    const object = {
      method,
      url,
      data: obj,
      headers,
    };
    const { data } = await axios(object);
    if (data) {
      return data;
    }
  } catch (err) {
    if (err?.response?.data?.message === "jwt expired") {
      console.log(err?.response?.data?.message);
      console.log("1.this is jwt epxired axios");

      const { status, accessJWT } = await getNewAccessJwtAxios();
      if (status === "success") {
        console.log("2.this is jwt epxired axios");
        sessionStorage.setItem("accessJWT", accessJWT);
        return axiosExcecutor({
          method,
          url,
          obj,
          isPrivate,
          refreshToken,
        });
      }
    }
    return {
      status: "error",
      message: err?.response?.data?.message,
    };
  }
};

export const getAllCatAxios = async (data) => {
  const obj = {
    method: "get",
    url: categoryAPI,
    obj: data,
  };

  return await axiosExcecutor(obj);
};

export const getCatItemsAxios = async ({ slug, _id }) => {
  const obj = {
    method: "get",
    url: categoryAPI + "/" + slug + "/" + _id,
  };
  return axiosExcecutor(obj);
};

export const getCatItemByIdAxios = (_id) => {
  const obj = {
    method: "get",
    url: categoryAPI + "/getItem/" + _id,
  };

  return axiosExcecutor(obj);
};

export const signUpAxios = (user) => {
  const obj = {
    method: "post",
    url: customerAPI + "/addUser",
    obj: user,
  };
  return axiosExcecutor(obj);
};

export const verifyUserAxios = (data) => {
  const obj = {
    method: "post",
    url: customerAPI + "/verifyUser",
    obj: data,
  };

  return axiosExcecutor(obj);
};

export const loginAxios = (user) => {
  const obj = {
    method: "post",
    url: customerAPI + "/login",
    obj: user,
  };
  return axiosExcecutor(obj);
};

export const getUserAxios = () => {
  const obj = {
    method: "get",
    url: customerAPI + "/getUserInfo",
    isPrivate: true,
  };
  return axiosExcecutor(obj);
};

export const getNewAccessJwtAxios = async () => {
  const obj = {
    method: "get",
    url: customerAPI + "/getAccessJWT",
    isPrivate: true,
    refreshToken: true,
  };

  return axiosExcecutor(obj);
};

export const getPaymentMethodsAxios = async () => {
  const obj = {
    method: "get",
    url: payment,
    isPrivate: true,
  };
  return axiosExcecutor(obj);
};

export const addOrderAxios = (order) => {
  const obj = {
    method: "post",
    url: orderAPI + "/add",
    obj: order,
    isPrivate: true,
  };

  return axiosExcecutor(obj);
};

export const logoutAxios = async (id) => {
  const obj = {
    method: "post",
    url: customerAPI + "/signout",
    obj: {
      _id: id,
      accessJWT: getSessionToken(),
      refreshJWT: getRefreshToken(),
    },
    isPrivate: true,
  };
  await axiosExcecutor(obj);
};

export const getProducts = async () => {
  const obj = {
    method: "get",
    url: categoryAPI + "/getProduct",
  };

  return axiosExcecutor(obj);
};

export const getTrendingAxios = async () => {
  const obj = {
    method: "get",
    url: orderAPI + "/trending",
  };
  return axiosExcecutor(obj);
};

export const sendPaymentAxios = async (data) => {
  const obj = {
    method: "post",
    url: payment + "/create-payment-intent",
    obj: data,
    isPrivate: true,
  };
  return axiosExcecutor(obj);
};

export const deleteOrderAxios = async (id) => {
  const obj = {
    method: "delete",
    url: orderAPI + "/" + id,
    isPrivate: true,
  };

  return axiosExcecutor(obj);
};
