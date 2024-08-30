import { createSlice } from "@reduxjs/toolkit";

import { act } from "react";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addInitialItems: (state, action) => {
      return action.payload;
    },
  },
});
export const itemsActions = itemsSlice.actions;

export default itemsSlice;
