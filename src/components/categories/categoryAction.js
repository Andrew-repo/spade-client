import {
  getAllCatAxios,
  getCatItemByIdAxios,
  getCatItemsAxios,
  getProducts,
} from "../helper/axios";
import { setCategory } from "./categorySlice";
import { setProducts } from "../productCom/productSlice";

export const getAllCatAction = () => async (dispatch) => {
  const { status, message, result } = await getAllCatAxios();
  console.log(status);
  // toast[status](message);
  if (status === "success") dispatch(setCategory(result));
};

export const getCatBySlugAction = async (obj) => {
  const { status, message, data } = await getCatItemsAxios(obj);
  // toast[status](message);
  if (status === "success") return data;
};

export const getCatItemById = async (id) => {
  const { status, message, data } = await getCatItemByIdAxios(id);
  console.log(data);
  // toast[status](message);
  if (status === "success") return data;
};

export const getProductsAction = () => async (dispatch) => {
  const { status, products } = await getProducts();

  if (status === "success") {
    return dispatch(setProducts(products));
  }
};
