import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
	let inputElement = null;

	switch(props.elementType) {
	case 'input':
		inputElement = <input
			className={classes.InputElement}
			{...props.elementConfig}
			value={props.value}
			onChange={props.changed} id={props.id} />;
		break;
	default:
		break;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default Input;