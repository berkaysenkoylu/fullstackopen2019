import React, { useState } from 'react';

import classes from './BlogInfo.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const BlogInfo = (props) => {
	const [comment, setComment] = useState({
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Add a comment'
		},
		value: ''
	});

	const urlArr = props.location.pathname.split('/');
	const blogId = urlArr[urlArr.length-1];

	const blogPost = props.bloglist.find(blog => blog._id === blogId);

	const onBackClickedHandler = () => {
		props.history.goBack();
	};

	const deleteHandler = () => {
		props.deleteBlogPost(blogPost._id);
		props.history.goBack();
	};

	const onCommentInputChangedHandler = (event) => {
		const copiedComment = {...comment};

		copiedComment.value = event.target.value;

		setComment(copiedComment);
	};

	const onAddCommentHandler = () => {
		const data = {
			id: blogId, content: comment.value
		};

		props.blogCommented(data);
	};

	let pageContent = null;
	let commentInputSection = (
		<div className={classes.CommentInputSection}>
			<Input
				elementType={comment.elementType}
				elementConfig={comment.elementConfig}
				changed={(event) => onCommentInputChangedHandler(event)}
				value={comment.value}
				id="comment_input" />

			<Button ButtonType='ButtonPrimary' ButtonSize='ButtonSmall' clicked={onAddCommentHandler} id="add_comment_button">Add</Button>
		</div>
	);

	let comments;
	let commentContent = (
		<>
			{commentInputSection}

			<p>There is no comment added yet!</p>
		</>
	);

	if(blogPost && blogPost !== null && blogPost !== undefined) {
		if(blogPost.comments.length > 0) {
			comments = blogPost.comments.map(comment => {
				return <li key={comment}>{comment}</li>;
			});
			commentContent = (
				<>
					{commentInputSection}

					<ul>
						{comments}
					</ul>
				</>
			);
		}

		pageContent = (
			<div className={classes.BlogInfoContainer}>
				<h1>{blogPost.title}</h1>
				<div className={classes.BlogInfoContent}>
					<a href={blogPost.url}>{blogPost.url}</a>
					<p>{blogPost.likes} likes</p>
					<p>added by {blogPost.user.username}</p>
				</div>

				<div className={classes.BlogInfoComments}>
					<h3>Comments</h3>
					{commentContent}
				</div>

				<div className={classes.ButtonContainer}>
					<Button ButtonType='ButtonPrimary' ButtonSize='ButtonSmall' clicked={() => props.likedBlogPost(blogPost._id)} id="like_button">Like</Button>
					<Button ButtonType='ButtonPrimary' ButtonSize='ButtonSmall' clicked={onBackClickedHandler} id="back_button">Back</Button>
					{ localStorage.getItem('userId') === blogPost.user._id ? <Button ButtonType='ButtonDanger' ButtonSize='ButtonSmall' clicked={deleteHandler} id="delete_button">Delete</Button> : null}
				</div>
			</div>
		);
	}

	return (
		<div>
			{pageContent}
		</div>
	);
};

export default BlogInfo;