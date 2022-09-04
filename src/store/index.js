import { configureStore } from '@reduxjs/toolkit';
import heroes from '../reducers/heroesSlice';
import filters from '../reducers/filtersSlice';


const store = configureStore({
    reducer: {heroes, filters},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})


export default store;