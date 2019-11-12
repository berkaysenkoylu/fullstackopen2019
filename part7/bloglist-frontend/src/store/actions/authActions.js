import * as actionTypes from './actionTypes';
import axiosAuth from '../../axiosAuth';

export const loginStart = () => {
	return {
		type: actionTypes.LOGIN_START
	};
};

export const loginSuccess = (userData) => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		data: userData
	};
};

export const loginFail = (error) => {
	return {
		type: actionTypes.LOGIN_FAIL,
		error: error
	};
};

export const loginUser = (userCredentials) => {
	return dispatch => {
		dispatch(loginStart());

		return axiosAuth.post('/login', userCredentials).then(response => {

			const userInfo = {
				username: response.data.username,
				userId: response.data.userId,
				userToken: response.data.token
			};

			// Save user to local storage
			localStorage.setItem('username', userInfo.username);
			localStorage.setItem('userId', userInfo.userId);
			localStorage.setItem('token', userInfo.userToken);

			dispatch(loginSuccess(userInfo));

			return Promise.resolve({isError: false, message: 'Successfully logged in'});
		}).catch(error => {
			let errorMessage = '';
			if(error.response.status === 404) {
				errorMessage = 'Check backend path!';
				dispatch(loginFail(errorMessage));
			}
			else {
				errorMessage = error.response.data.message;
				dispatch(loginFail(errorMessage));
			}
			return Promise.resolve({isError: true, message: errorMessage});
		});
	};

	// return async dispatch => {
	//     dispatch(loginStart());

	//     try
	//     {
	//         const response = await axiosAuth.post('/login', userCredentials);

	//         const userInfo = {
	//             username: response.data.username,
	//             userId: response.data.userId,
	//             userToken: response.data.token
	//         }

	//         // Save user to local storage
	//         localStorage.setItem('username', userInfo.username);
	//         localStorage.setItem('userId', userInfo.userId);
	//         localStorage.setItem('token', userInfo.userToken);

	//         dispatch(loginSuccess(userInfo));

	//         return Promise.resolve({isError: false, message: 'Successfully logged in'});
	//     }
	//     catch(error)
	//     {
	//         let errorMessage = '';
	//         if(error.response.status === 404) {
	//             errorMessage = 'Check backend path!';
	//             dispatch(loginFail('Check backend path!'));
	//         }
	//         else {
	//             errorMessage = error.response.data.message;
	//             dispatch(loginFail(error.response.data.message));
	//         }
	//         return Promise.resolve({isError: true, message: errorMessage});
	//     }
	// }
};

export const autoLoginUser = () => {
	return dispatch => {
		dispatch(loginStart());

		// Check if there is user info in local storage
		const userInfo = {
			username: localStorage.getItem('username'),
			userId: localStorage.getItem('userId'),
			userToken: localStorage.getItem('token')
		};

		if(userInfo.username !== null && userInfo.userId !== null && userInfo.userToken !== null) {
			dispatch(loginSuccess(userInfo));
		}
		else {
			dispatch(logoutUser());
		}
	};
};

export const logoutUser = () => {
	// Clear all the info from local storage
	localStorage.clear();
	return {
		type: actionTypes.LOGOUT
	};
};