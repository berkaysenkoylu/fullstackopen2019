import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const Button = (props) => {
	return (
		<button
			className={[classes.Button, classes[props.ButtonType], classes[props.ButtonSize], classes[props.ButtonAlignment]].join(' ')}
			onClick={props.clicked} id={props.id}>{props.children}</button>
	);
};

Button.propTypes = {
	ButtonType: PropTypes.string.isRequired,
	ButtonSize: PropTypes.string.isRequired
};

export default Button;