import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {

	let navList = (
		<ul className={classes.NavigationItems}>
			<NavigationItem path='/' exact id="home_nav">Home</NavigationItem>
		</ul>
	);

	if (props.auth.userToken && props.auth.userToken !== null && props.auth.userToken !== undefined) {
		navList = (
			<ul className={classes.NavigationItems}>
				<NavigationItem path='/' exact id="home_nav">Home</NavigationItem>
				<NavigationItem path='/blogs' exact id="blog_nav">Blogs</NavigationItem>
				<NavigationItem path='/users' exact id="users_nav">Users</NavigationItem>
			</ul>
		)
	}

	return (
		<React.Fragment>
			{navList}
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(NavigationItems);