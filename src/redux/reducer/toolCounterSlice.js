import { configureStore, createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { counter: 0 },
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    dicrement: (state) => {
      state.counter -= 1;
    }
  },
});

export const actions = counterSlice.actions;

const Store = configureStore({
    reducer: counterSlice.reducer,
  });
  
  export default Store;
  