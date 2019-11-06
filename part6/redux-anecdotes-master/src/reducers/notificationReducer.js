const initialState = {
    message: 'You did not act'
};

const setMessage = (state, newMessage) => {
    const copiedState = {...state};
    copiedState.message = newMessage;
    return {...copiedState};
}

// TO CLEAR THE TIMEOUT
let timeout;

// ACTION
export const createNotification = (notificationMessage, duration) => {
    return dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            message: notificationMessage
        });

        // If user repeatedly votes, then we will have lots of 
        // unnecessary timeouts that do exactly the same as the one 
        // which is the result of the last button (vote) press.
        // To get rid of this, clear the timeout if there is one 
        // from the previous notification event
        if(timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            dispatch({
                type: 'SET_MESSAGE',
                message: ''
            });
        }, duration * 1000);
    }
}

const reducer = (state=initialState, action) => {

    switch(action.type) {
        case 'SET_MESSAGE':
            state = setMessage(state, action.message);
            break;
        default:
            break;
    }
    return state;
}

export default reducer;