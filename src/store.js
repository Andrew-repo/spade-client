import { configureStore } from "@reduxjs/toolkit";
import category from "./components/categories/categorySlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import cartSlice from "./components/cartComponent/cartSlice";
import userSlice from "./components/customerComponent/customerSlice";
import productSlice from "./components/productCom/productSlice";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistConfig, cartSlice);

const store = configureStore({
  reducer: {
    categoryCollection: category,
    cartStore: persistedCart,
    userInfo: userSlice,
    productsInfo: productSlice,
  },
});

const persistor = persistStore(store);

export { store, persistor };
