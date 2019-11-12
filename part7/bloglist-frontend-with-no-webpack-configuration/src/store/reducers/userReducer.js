import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state=initialState, action) => {

	switch(action.type) {
	case actionTypes.FETCH_USERS:
		state = [...action.data];
		break;
	default:
		break;
	}

	return state;
};

export default reducer;