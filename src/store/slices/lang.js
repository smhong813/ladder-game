import { createSlice } from '@reduxjs/toolkit';

const langSlice = createSlice({
  name: 'lang',
  initialState: {
    current: 'en',
    available: ['en', 'ko'],
  },
  reducers: {
    set: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const langSelectors = {
  currentLang: (store) => store.lang.current,
  availableLangs: (store) => store.lang.available,
};

export const actions = langSlice.actions;
export default langSlice.reducer;
