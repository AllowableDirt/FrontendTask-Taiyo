// src/store/Store.js
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';

const store = configureStore({
    reducer: {
      contacts: contactReducer,
    },
});

export default store;
