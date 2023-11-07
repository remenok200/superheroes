import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from 'redux/slices/heroSlice';

const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
});

export default store;
