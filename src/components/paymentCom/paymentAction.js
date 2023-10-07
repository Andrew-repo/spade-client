import { getPaymentMethodsAxios, sendPaymentAxios } from "../helper/axios";

export const getPaymentMethodAction = async () => {
  const { status, methods } = await getPaymentMethodsAxios();
  if (status === "success") return methods;
};

export const sendPayment = async (data) => {
  const { client_secret } = await sendPaymentAxios(data);

  if (client_secret) return client_secret;
};
