import {heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice';

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFiltres = (request) => (dispatch) => {
    dispatch(filtersFetching());
        request('http://localhost:3001/filters')
        .then(res => {
            dispatch(filtersFetched(res))
        })
        .catch(() => {
            dispatch(filtersFertchingError);
            throw new Error('Fetching error!');
        });
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFertchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}


export const changeFilterStatus = (status) => {
    return {
        type: 'FILTER_CHANGE_STATUS',
        payload: status
    }
};
