import React, { useState, useImperativeHandle } from 'react';

import classes from './Togglable.module.css';
import Button from '../../UI/Button/Button';

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		};
	});

	return (
		<div className={classes.Togglable}>
			<div style={hideWhenVisible}>
				<Button ButtonType='ButtonPrimary' ButtonSize='ButtonSmall' clicked={toggleVisibility} id={props.id}>{props.toggleName}</Button>
			</div>

			<div style={showWhenVisible}>
				{props.children}
			</div>
		</div>
	);
});

export default Togglable;