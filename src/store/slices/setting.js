import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  app: {
    lang: 'ko', // TODO: change into en
    bgm: 'on',
    soundEffect: 'on',
    ladderComplexity: 'normal',
    ladderLength: 'normal',
    ladderDirection: 'vertical',
  },
  player: {
    preset: null,
    total: 0, // TODO: check if it is necessary
    players: [],
  },
  prize: {
    preset: null,
    total: 0, // TODO: check if it is necessary
    prizes: [],
  },
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    reset: (state) => {
      state.player = initialState.player;
      state.prize = initialState.prize;
    },
    appSetting: (state, action) => {
      state.app = action.payload;
    },
    setPlayers: (state, action) => {
      state.player.players = action.payload;
      state.player.total = action.payload.length;
    },
    setPrizes: (state, action) => {
      state.prize.prizes = action.payload;
      state.prize.total = action.payload.length;
    },
    setPreset: (state, action) => {
      state[action.payload.type].preset = action.payload.preset;
    },
  },
});

export const actions = settingSlice.actions;
export const selectors = {
  app: (store) => store.setting.app,
  player: (store) => store.setting.player.players,
  prize: (store) => store.setting.prize.prizes,
};
export default settingSlice.reducer;
