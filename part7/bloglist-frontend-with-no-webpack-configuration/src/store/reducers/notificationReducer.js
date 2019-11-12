import * as actionTypes from '../actions/actionTypes';

const initialState = {
	show: false,
	isError: false,
	message: ''
};

const reducer = (state=initialState, action) => {

	const copiedState = {...state};
	switch(action.type) {
	case actionTypes.SET_MESSAGE:
		state = {...copiedState, ...action.data};
		break;
	case actionTypes.RESET_MESSAGE:
		state = {...copiedState, show: false, isError: false, message: ''};
		break;
	default:
		break;
	}
	return state;
};

export default reducer;