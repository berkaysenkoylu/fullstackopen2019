import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import classes from './Users.module.css';
import UserList from './UserList/UserList';
import UserInfo from './UserInfo/UserInfo';

const Users = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.fetchAllUsers());
	}, [dispatch]);

	return (
		<div className={classes.Content}>
			<Route exact path="/users" render={() => <UserList users={props.userList} />} />
			<Route path="/users/:id" render={() => <UserInfo users={props.userList} />} />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		userList: state.users
	};
};

export default connect(mapStateToProps)(Users);