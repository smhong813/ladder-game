import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  close: false,
};

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    close: (state, action) => {
      state.close = action.payload;
    },
  },
});

export const actions = bottomSheetSlice.actions;
export const selectors = {
  close: (store) => store.bottomSheet.close,
};
export default bottomSheetSlice.reducer;
