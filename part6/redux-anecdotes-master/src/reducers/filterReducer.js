const initialState = {
    filter: ''
};

// ACTIONS
export const setFilter = (filterValue) => {
    return {
        type: 'SET_FILTER',
        value: filterValue
    };
}

const reducer = (state=initialState, action) => {

    switch(action.type) {
        case 'SET_FILTER':
            const copiedState = {...state};
            copiedState.filter = action.value;
            state = {...copiedState};
            break;
        default:
            break;
    }
    return state;
}

export default reducer;