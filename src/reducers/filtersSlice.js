import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "../hooks/http.hook"

const initialState = {
    filter: 'Все',
    filtersLoadingStatus: 'idle',
    filters: []
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return request('http://localhost:3001/filters');
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterChangeStatus: (state, action) => {
            state.filter = action.payload
        } 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = "loading"})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
    }
})

const {reducer, actions} = filtersSlice;

export default reducer;

export const {filterChangeStatus} = actions;