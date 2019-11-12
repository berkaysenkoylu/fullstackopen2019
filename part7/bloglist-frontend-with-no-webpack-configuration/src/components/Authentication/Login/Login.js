// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../../UI/Heading/Heading';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './Login.module.css';

// import axiosAuth from '../../../axiosAuth';
// import { loginUser } from '../../../services/authentication';

// With custom hook
import { useField } from '../../../hooks/index';

const Login = (props) => {
	const username = useField('input', { type: 'text', placeholder: 'Username' });
	const password = useField('input', { type: 'password', placeholder: 'Password' });

	const onLoginHandler = async (event) => {
		event.preventDefault();

		const userCredentials = {
			username: username.value,
			password: password.value
		};

		username.clear();
		password.clear();

		props.userLoggedIn(userCredentials);

		// try
		// {
		// 	const loggedInUser = await loginUser(userCredentials);

		// 	props.userLoggedIn(loggedInUser);
		// }
		// catch(error)
		// {
		// 	props.userFailedLoggingIn(error.response.data.message);
		// }
	};

	return (
		<div className={classes.Login}>
			<Heading HeadingType='HeadingSecondary'>Login to Application</Heading>
			<form onSubmit={(event) => onLoginHandler(event)}>
				{/* {loginFormElement} */}
				<Input
					label="Username"
					{...username}
					changed={(event) => username.onChange(event)} id='username_input' />
				<Input
					label="Password"
					{...password}
					changed={(event) => password.onChange(event)} id='password_input' />
				<Button
					ButtonType='ButtonPrimary'
					ButtonSize='ButtonSmall'
					ButtonAlignment='ButtonCenter'
					id="login_button">Login</Button>
			</form>
		</div>
	);
};

Login.propTypes = {
	userLoggedIn: PropTypes.func.isRequired,
	userFailedLoggingIn: PropTypes.func.isRequired
};

export default Login;