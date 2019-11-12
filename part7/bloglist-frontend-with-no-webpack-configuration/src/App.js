import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Heading from './components/UI/Heading/Heading';
import Divider from './components/UI/Divider/Divider';
import BlogListContainer from './containers/BlogList/BlogListContainer';
import AuthContainer from './containers/Auth/Auth';
import Notification from './components/Notification/Notification';
import Users from './components/Users/Users';

const App = (props) => {
	let pageContent = null;

	if (props.auth.username || props.auth.username !== null) {
		pageContent = (
			<div>
				<Route path="/users" component={Users} />
				<Route path="/blogs" component={BlogListContainer} />
			</div>
		);
	}

	return (
		<Layout auth={props.auth}>
			<Heading HeadingType='HeadingPrimary'>FSO 2019 - Part 7</Heading>
			<Divider>{'</>'}</Divider>
			{props.notification.show ? <Notification notificationType={props.notification.isError ? 'NotificationDanger' : 'NotificationSuccess'}>{props.notification.message}</Notification> : null}
			<AuthContainer />
			{pageContent}
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		notification: state.notification,
		auth: state.auth
	};
};

export default connect(mapStateToProps, null)(App);