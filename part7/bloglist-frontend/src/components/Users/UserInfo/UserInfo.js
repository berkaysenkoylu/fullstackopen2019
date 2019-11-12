import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './UserInfo.module.css';
import Heading from '../../UI/Heading/Heading';
import Button from '../../UI/Button/Button';

const UserInfo = (props) => {
	let urlArr = props.match.url.split('/');
	let userId = urlArr[urlArr.length-1];

	let user = props.users.find(user => user.id === userId);

	let blogContent;

	if(user !== null && user && user !== undefined) {
		blogContent = user.blogs.map(blog => {
			return <li key={blog._id}>{blog.title}</li>;
		});

		if(user.blogs.length === 0) {
			blogContent = <p style={{textAlign: 'center', marginTop: '1rem'}}>~ No blog added yet ~</p>;
		}
	}

	const onBackClickedHandler = () => {
		props.history.goBack();
	};

	return (
		<div className={classes.UserInfo}>
			<Heading HeadingType="HeadingSecondary">{user ? user.name:null}</Heading>
			<h2>added blogs</h2>
			<ul className={classes.UserBlogList}>
				{blogContent}
			</ul>
			<Button
				ButtonType="ButtonPrimary"
				ButtonSize="ButtonSmall"
				ButtonAlignment="ButtonCenter"
				clicked={onBackClickedHandler}>Back</Button>
		</div>
	);
};

export default withRouter(UserInfo);