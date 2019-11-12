import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import * as actions from '../../store/actions/index';
import Login from '../../components/Authentication/Login/Login';
import LoggedInUser from '../../components/Authentication/LoggedInUser';

const Auth = (props) => {
	// NB: This gives a warning: 'React Hook useEffect has a missing dependency: 'props'. ...'
	// If I include props in dependency array like [props], then; it keeps making http calls, it was like an infinite loop.
	// I was not sure if I leave it like the following (with warning but no infinite loop),
	// so I fixed the problem by using useDispatch (see lines: 22-26)
	// useEffect(() => {
	// 	props.onAutoLoginUser();
	// }, [])
	const dispatch = useDispatch();
	
	useEffect(() => {
		// Try to auto log in user
		dispatch(actions.autoLoginUser());
	}, [dispatch]);

	const onUserLoggedIn = (userInfo) => {
		props.onLogin(userInfo).then(value => {
			displayNotification(value.isError, value.message, 3);
		});
	};

	const onUserFailedToLogIn = (errorMessage) => {
		// Display message
		displayNotification(true, errorMessage, 3);
	};

	const displayNotification = (iserror, message, duration) => {
		const data = {
			show: true,
			isError: iserror,
			message: message,
			duration: duration
		};
		props.onDisplayMessage(data);
	};

	const onUserLoggedOut = () => {
		props.onLogout();
	};

	let pageContent = <Login userLoggedIn={onUserLoggedIn} userFailedLoggingIn={onUserFailedToLogIn} />;

	if(props.auth.username || props.auth.username !== null) {
		pageContent = <LoggedInUser onLogout={onUserLoggedOut}>{props.auth.username}</LoggedInUser>
	}

	return (
		<div>
			{pageContent}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification,
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// Notification reducer action
		onDisplayMessage: (data) => dispatch(actions.showNotificationMessage(data)),
		// Auth reducer actions
		onAutoLoginUser: () => dispatch(actions.autoLoginUser()),
		onLogin: (userCredentials) => dispatch(actions.loginUser(userCredentials)),
		onLogout: () => dispatch(actions.logoutUser())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);