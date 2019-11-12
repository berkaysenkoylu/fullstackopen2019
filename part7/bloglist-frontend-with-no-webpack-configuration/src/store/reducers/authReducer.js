import * as actionTypes from '../actions/actionTypes';

const initialState = {
	username: null,
	userId: null,
	userToken: null,
	error: null
};

const reducer = (state=initialState, action) => {

	const copiedState = {...state};

	switch(action.type) {
	case actionTypes.LOGIN_START:
		state = {...copiedState, username: null, userId: null, userToken: null, error: null};
		break;
	case actionTypes.LOGIN_SUCCESS:
		state = {...copiedState, ...action.data, error: null};
		break;
	case actionTypes.LOGIN_FAIL:
		state = {...copiedState, username: null, userId: null, userToken: null, error: action.error};
		break;
	case actionTypes.LOGOUT:
		state = {...copiedState, username: null, userId: null, userToken: null, error: null};
		break;
	default:
		break;
	}
	return state;
};

export default reducer;