// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../../UI/Heading/Heading';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './Login.module.css';

// import axiosAuth from '../../../axiosAuth';
import { loginUser } from '../../../services/authentication';

// With custom hook
import { useField } from '../../../hooks/index';

const Login = (props) => {
	// const [ loginForm, setLoginForm ] = useState({
	// 	formControls: {
	// 		username: {
	// 			elementType: 'input',
	// 			elementConfig: {
	// 				type: 'text',
	// 				placeholder: 'Username'
	// 			},
	// 			value: ''
	// 		},
	// 		password: {
	// 			elementType: 'input',
	// 			elementConfig: {
	// 				type: 'password',
	// 				placeholder: 'Password'
	// 			},
	// 			value: ''
	// 		}
	// 	}
	// });

	const username = useField('input', { type: 'text', placeholder: 'Username' });
	const password = useField('input', { type: 'password', placeholder: 'Password' });

	// const onInputFieldChanged = (event, inputField) => {
	// 	// Immutable modification
	// 	const copiedLoginForm = {...loginForm};

	// 	const copiedFormControls = {...copiedLoginForm.formControls};
	// 	//

	// 	copiedFormControls[inputField].value = event.target.value;

	// 	copiedLoginForm.formControls = copiedFormControls;

	// 	// Update the state
	// 	setLoginForm(copiedLoginForm);
	// };

	const onLoginHandler = async (event) => {
		event.preventDefault();

		const userCredentials = {
			username: username.value,
			password: password.value
		};

		// axiosAuth.post('/login', userCredentials).then(response => {
		//     props.userLoggedIn(response.data);
		// }).catch(error => {
		//     props.userFailedLoggingIn(error.response.data.message);
		// })

		username.clear();
		password.clear();

		try
		{
			const loggedInUser = await loginUser(userCredentials);

			props.userLoggedIn(loggedInUser);
		}
		catch(error)
		{
			props.userFailedLoggingIn(error.response.data.message);
		}
	};

	// const loginFormElement = Object.keys(loginForm.formControls).map(formCtrl => {
	// 	return <Input
	// 		key={formCtrl}
	// 		label={formCtrl}
	// 		elementType={loginForm.formControls[formCtrl].elementType}
	// 		elementConfig={loginForm.formControls[formCtrl].elementConfig}
	// 		value={loginForm.formControls[formCtrl].value}
	// 		changed={(event) => onInputFieldChanged(event, formCtrl)} />;
	// });

	return (
		<div className={classes.Login}>
			<Heading HeadingType='HeadingSecondary'>Login to Application</Heading>
			<form onSubmit={(event) => onLoginHandler(event)}>
				{/* {loginFormElement} */}
				<Input
					label="Username"
					{...username}
					changed={(event) => username.onChange(event)} />
				<Input
					label="Password"
					{...password}
					changed={(event) => password.onChange(event)} />
				<Button
					ButtonType='ButtonPrimary'
					ButtonSize='ButtonSmall'
					ButtonAlignment='ButtonCenter'>Login</Button>
			</form>
		</div>
	);
};

Login.propTypes = {
	userLoggedIn: PropTypes.func.isRequired,
	userFailedLoggingIn: PropTypes.func.isRequired
};

export default Login;