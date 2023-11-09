import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from 'redux/slices/heroSlice';
import userReducer from 'redux/slices/userSlice';

const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    user: userReducer,
  },
});

export default store;
