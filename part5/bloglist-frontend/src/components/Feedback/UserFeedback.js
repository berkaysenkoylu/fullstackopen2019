import React from 'react';

import classes from './UserFeedback.module.css';

const UserFeedback = (props) => {
	return (
		<div className={[classes.UserFeedback, classes[props.feedbackType]].join(' ')}>
			{props.children}
		</div>
	);
};

export default UserFeedback;