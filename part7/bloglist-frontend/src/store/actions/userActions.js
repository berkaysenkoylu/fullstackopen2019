import * as actionTypes from './actionTypes';
import axiosAuth from '../../axiosAuth';

export const fetchAllUsers = () => {
	return async dispatch => {

		const response = await axiosAuth.get('');

		dispatch({
			type: actionTypes.FETCH_USERS,
			data: response.data.data
		});
	};
};