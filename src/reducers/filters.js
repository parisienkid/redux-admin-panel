const initialState = {
    filter: 'Все',
    filtersLoadingStatus: 'idle',
    filters: []
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTER_CHANGE_STATUS':
            return {
                    ...state,
                    filter: action.payload
            }
        default: return state
    }
}

export default filters;