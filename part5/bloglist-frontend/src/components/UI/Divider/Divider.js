import React from 'react';

import classes from './Divider.module.css';

const Divider = (props) => {
	return (
		<div className={classes.Divider}>{props.children}</div>
	);
};

export default Divider;