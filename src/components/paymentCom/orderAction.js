import { toast } from "react-toastify";
import {
  addOrderAxios,
  deleteOrderAxios,
  getTrendingAxios,
} from "../helper/axios";

export const orderAction = async (order) => {
  const pending = addOrderAxios(order);

  toast.promise(pending, {
    pending: "...please wait",
  });

  const { status, item } = await pending;

  if (status === "success") {
    return { status, item };
  }
};

export const deleteOrderAction = async (id) => {
  const { status } = await deleteOrderAxios(id);
  toast[status]("delete status");
  if (status) return status;
};

export const getTrendingAction = async () => {
  const { status, trendingItem } = await getTrendingAxios();
  if (status === "success") return trendingItem;
};
