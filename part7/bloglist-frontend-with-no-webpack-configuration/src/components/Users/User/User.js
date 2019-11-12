import React from 'react';
import { Link } from 'react-router-dom';

import classes from './User.module.css';

const User = (props) => {
	return (
		<tr className={classes.TableRow}>
			<td>{props.user.username}</td>
			<td>{props.user.blogs.length}</td>
			<td><Link to={props.currentUrl + '/' + props.user.id}>More &rarr;</Link></td>
		</tr>
	);
};

export default User;