import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

import * as actions from '../../store/actions/index';

import BlogList from '../../components/BlogList/Bloglist';

const BlogListContainer = (props) => {
	const blogCreateRef = useRef(null);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.getAllBlogs());
	}, [dispatch]);

	const onNewBlogCreated = (newBlogEntry) => {
		props.onCreateNewBlog(props.auth.userToken, newBlogEntry);

		// Make blog create form invisible
		blogCreateRef.current.toggleVisibility();

		// Display message
		displayNotification(false, `Blog entry of title ${newBlogEntry.title} is created by ${props.auth.username}`, 3);
	};

	const displayNotification = (iserror, message, duration) => {
		const data = {
			show: true,
			isError: iserror,
			message: message,
			duration: duration
		};
		props.onDisplayMessage(data);
	};

	const cancelBlogCreate = () => {
		blogCreateRef.current.toggleVisibility();
	};

	const onBlogPostLikedHandler = (id) => {
		props.onLikedBlogPost(id);
	};

	const onBlogPostCommentedHandler = (data) => {
		props.onCommentedBlogPost(data.id, data.content);
	};

	const onBlogPostDeletedHandler = (id) => {
		props.onDeleteBlogPost(props.auth.userToken, id).then(value => {
			if(value.status !== 200){
				displayNotification(true, value.message, 3);
			}
			else {
				displayNotification(false, value.message, 3);
			}
		});
	};

	return (
		<div>
			<BlogList
				blogList={props.bloglist}
				onBlogPostLiked={onBlogPostLikedHandler}
				onBlogPostCommented={onBlogPostCommentedHandler}
				onBlogPostDeleted={onBlogPostDeletedHandler}
				blogCreateReference={blogCreateRef}
				token={props.auth.userToken}
				newBlogCreate={onNewBlogCreated}
				canceledBlogCreate={cancelBlogCreate} />
		</div>
	)
}

const mapStateToProps = state => {
	return {
		notification: state.notification,
		bloglist: state.bloglist,
		auth: state.auth
	}
}

const mapDispatchToProps = dispatch => {
	return {
		// Notification
		onDisplayMessage: (data) => dispatch(actions.showNotificationMessage(data)),
		// Bloglist
		onGetAllBlogs: () => dispatch(actions.getAllBlogs()),
		onCreateNewBlog: (token, blogPost) => dispatch(actions.createNewBlog(token, blogPost)),
		onLikedBlogPost: (blogPostId) => dispatch(actions.likeBlogPost(blogPostId)),
		onCommentedBlogPost: (blogPostId, content) => dispatch(actions.commentOnBlogPost(blogPostId, content)),
		onDeleteBlogPost: (token, blogPostId) => dispatch(actions.deleteBlogPost(token, blogPostId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogListContainer);