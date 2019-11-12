import * as actionTypes from './actionTypes';

export const resetNotificationMessage = () => {
	return {
		type: actionTypes.RESET_MESSAGE
	};
};

let timeout;

export const showNotificationMessage = (data) => {
	const { duration, ...restOfData } = data;
	return dispatch => {
		// Dispatch the 'SET_MESSAGE'
		dispatch({
			type: actionTypes.SET_MESSAGE,
			data: restOfData
		});

		// After the duration, dispatch 'RESET_MESSAGE'
		if(timeout !== null) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			dispatch(resetNotificationMessage());
		}, duration * 1000);
	};
};