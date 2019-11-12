import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './UserList.module.css';
import Heading from '../../../components/UI/Heading/Heading';
import User from '../User/User';

const UserList = (props) => {

	let content = null;
	if(props.users) {
		content = props.users.map(user => {
			return <User key={user.id} user={user} currentUrl={props.match.url} />;
		});
	}
	return (
		<div>
			<Heading HeadingType="HeadingSecondary">USERS</Heading>
			<table className={classes.Table}>
				<tbody>
					<tr>
						<th>Username</th>
						<th>Blog Count</th>
						<th>More Info</th>
					</tr>
					{content}
				</tbody>
			</table>
		</div>
	);
};

export default withRouter(UserList);