import React from 'react';

import classes from './LoggedInUser.module.css';
import Button from '../UI/Button/Button';

const LoggedInUser = (props) => {

	const onLogoutButtonClicked = () => {
		props.onLogout();
	};

	return (
		<div className={classes.LoggedInUser}>
			<p className={classes.Username}>{props.children} logged in</p>
			<Button
				ButtonType='ButtonDanger'
				ButtonSize='ButtonSmall'
				ButtonAlignment='ButtonNoMargin'
				clicked={onLogoutButtonClicked}
				id="logout_button">Logout</Button>
		</div>
	);
};

export default LoggedInUser;
