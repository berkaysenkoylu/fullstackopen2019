import React, { useState, useEffect, useRef } from 'react';

import Heading from './components/UI/Heading/Heading';
import Divider from './components/UI/Divider/Divider';
import Login from './components/Authentication/Login/Login';
import LoggedInUser from './components/Authentication/LoggedInUser';
import CreateBlog from './components/BlogList/CreateBlog/CreateBlog';
import BlogList from './components/BlogList/Bloglist';
import Togglable from './components/Utility/Togglable/Togglable';
import UserFeedback from './components/Feedback/UserFeedback';

import { getAll, likeBlogPost, deleteBlogPost } from './services/blogs';

const App = () => {
	const [user, setUser] = useState(null);
	const [blogList, setBlogList] = useState([]);
	const [userFeedback, setUserFeedback] = useState({
		show: false,
		isError: false,
		message: ''
	});

	// To get the same ref object at every render, I use 'useRef' hook
	const blogCreateRef = useRef(null);

	useEffect(() => {
		// Try to auto log in user
		autoLoginUser();
	}, []);

	useEffect(() => {
		getAll().then(response => {
			setBlogList(response.blogs);
		});
	}, []);

	const onUserLoggedIn = (userInfo) => {
		setUser(userInfo);

		// Save user to local storage
		localStorage.setItem('username', userInfo.username);
		localStorage.setItem('userId', userInfo.userId);
		localStorage.setItem('token', userInfo.token);

		// Display message
		displayFeedbackMessage(false, 'Successfully logged in');
	};

	const onUserFailedToLogIn = (errorMessage) => {
		// Display message
		displayFeedbackMessage(true, errorMessage);
	};

	const onUserLoggedOut = () => {
		// Clear all the info from local storage
		localStorage.clear();

		// Clear the user state
		setUser(null);
	};

	const autoLoginUser = () => {
	// Check if there is user info in local storage; if not; do nothing
		if(!localStorage.getItem('username') && !localStorage.getItem('userId') && !localStorage.getItem('token')) {
			return;
		}

		let userInfo = {
			username: localStorage.getItem('username'),
			userId: localStorage.getItem('userId'),
			token: localStorage.getItem('token'),
		};

		setUser(userInfo);
	};

	const onNewBlogCreated = (newBlogEntry) => {
		// The following won't update the username bit on the new blog post
		// since blog's author is populated in mongodb. To fix it; I re-fetch
		// all the blog posts once a new blog post is created. if re-fetching blog posts is
		// found to be inefficient. Username in local storage might also be utilized since
		// user has to be logged in to create a blog post anyways

		// let copiedBlogList = [...blogList];

		// copiedBlogList = copiedBlogList.concat(newBlogEntry);

		// setBlogList(copiedBlogList);

		getAll(localStorage.getItem('token')).then(response => {
			setBlogList(response.blogs);
		});

		// Make blog create form invisible
		blogCreateRef.current.toggleVisibility();

		// Display message
		displayFeedbackMessage(false, `Blog entry of title ${newBlogEntry.title} is created by ${user.username}`);
	};

	const displayFeedbackMessage = (iserror, message) => {
		const copiedFeedback = {...userFeedback};
		copiedFeedback.show = true;
		copiedFeedback.isError = iserror;
		copiedFeedback.message = message;
		setUserFeedback(copiedFeedback);

		// Clear message
		setTimeout(() => {
			const copiedFeedback = {...userFeedback};
			copiedFeedback.show = false;
			copiedFeedback.isError = false;
			copiedFeedback.message = '';

			setUserFeedback(copiedFeedback);
		}, 3000);
	};

	const cancelBlogCreate = () => {
		blogCreateRef.current.toggleVisibility();
	};

	const onBlogPostLikedHandler = (id) => {
		likeBlogPost(id).then(result => {
			let copiedBlogList = [...blogList];

			copiedBlogList.forEach(blogpost => {
				if(blogpost._id === result.data._id) {
					blogpost.likes = result.data.likes;
				}
			});

			setBlogList(copiedBlogList);
		});
	};

	const onBlogPostDeletedHandler = async (id) => {
		try
		{
			const response = await deleteBlogPost(user.token, id);

			let copiedBlogList = [...blogList];

			copiedBlogList = copiedBlogList.filter(blog => blog._id !== response.data.data._id);

			displayFeedbackMessage(false, response.data.message);

			setBlogList(copiedBlogList);
		}
		catch(error)
		{
			displayFeedbackMessage(true, error.response.data.message);
		}
	};

	let pageContent = null;

	if (!user || user === null) {
		pageContent = <Login userLoggedIn={onUserLoggedIn} userFailedLoggingIn={onUserFailedToLogIn} />;
	}
	else {
		// Show username and their bloglist
		pageContent = (
			<div>
				<LoggedInUser onLogout={onUserLoggedOut}>{user.username}</LoggedInUser>

				<Togglable toggleName='Create a new blog' ref={blogCreateRef}>
					<CreateBlog token={user.token} newBlogCreated={onNewBlogCreated} blogCreateCancelled={cancelBlogCreate} />
				</Togglable>

				<BlogList blogList={blogList} onBlogPostLiked={onBlogPostLikedHandler} onBlogPostDeleted={onBlogPostDeletedHandler} />
			</div>
		);
	}

	return (
		<div>
			<Heading HeadingType='HeadingPrimary'>FSO 2019 - Part 5</Heading>
			<Divider>{'</>'}</Divider>
			{userFeedback.show ? <UserFeedback feedbackType={userFeedback.isError ? 'FeedbackDanger' : 'FeedbackSuccess'}>{userFeedback.message}</UserFeedback> : null}
			{pageContent}
		</div>
	);
};

export default App;
