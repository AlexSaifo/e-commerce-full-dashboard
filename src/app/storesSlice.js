import { createSlice } from "@reduxjs/toolkit";
import { storesData } from "../data/dummy";

const initialState = {
  stores: [],
  isAdd: false,
  isDelete: false,
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStores: (state, action) => {
      state.isAdd = false;
      state.stores = [...action.payload];
    },
    addStore: (state, action) => {
      state.isAdd = true;
      // const store = action.payload;
      // const existingStore = state.stores.find((str) => str.id === store.id);
      // if (!existingStore) {
      //   state.stores.push(store);
      // }
    },
    removeStore: (state, action) => {
      const storeId = action.payload;
      state.stores = state.stores.filter((store) => store.id !== storeId);
    },
  },
});

export const { addStore, addStores, removeStore } = storesSlice.actions;

export const selectAllStores = (state) => state.stores.stores;
export const selectStoreById = (state, storeId) =>
  state.stores.stores.find((store) => store.id === storeId);

export const storesReducer = storesSlice.reducer;
export default storesSlice;
