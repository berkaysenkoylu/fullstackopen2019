const initialState = {
    good: 0,
    ok: 0,
    bad: 0
};

const counterReducer  = (state=initialState, action) => {
    let copiedState = {...state};
    switch(action.type) {
        case 'GOOD':
            // copiedState.good += 1;
            state = {...copiedState, good: ++copiedState.good};
            break;
        case 'OK':
            copiedState.ok += 1;
            state = {...copiedState};
            break;
        case 'BAD':
            copiedState.bad += 1;
            state = {...copiedState};
            break;
        case 'RESET':
            Object.keys(copiedState).forEach(key => {
                copiedState[key] = 0;
            });
            state = {...copiedState};
            break;
        case 'DO_NOTHING':
            break;
        default:
            break;
    }

    return state;
}

export default counterReducer;