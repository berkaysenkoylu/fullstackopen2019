import React from 'react';

import classes from './Heading.module.css';

const Heading = (props) => {
	return (
		<header>
			<h1 className={[classes.Heading, classes[props.HeadingType]].join(' ')}>{props.children}</h1>
		</header>
	);
};

export default Heading;