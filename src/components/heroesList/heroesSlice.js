import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        },
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroCreated: (state, action) => {state.heroes.push(action.payload)},
        heroDeleted: (state, action) => {state.heroes.filter(hero => hero.id !== action.payload)}
    }
});

const {reducer, actions} = heroesSlice;

export default reducer;

export const {
    heroCreated,
    heroDeleted,
    heroesFetched,
    heroesFetching,
    heroesFetchingError,
} = actions;