import React, { useState } from 'react';

import classes from './Blog.module.css';
import Button from '../../UI/Button/Button';

const Blog = (props) => {
	const [blogContentVisible, setBlogContentVisible] = useState(false);
	const [contentClasses, setContentClasses] = useState([classes.BlogContent]);


	const toggleContentVisibility = () => {
		let copiedContentClasses = [...contentClasses];

		if(!blogContentVisible) {
			copiedContentClasses = copiedContentClasses.concat(classes.BlogContentReveal);

			setContentClasses(copiedContentClasses);
		}
		else {
			copiedContentClasses = copiedContentClasses.splice(0, 1);

			setContentClasses(copiedContentClasses);
		}
		setBlogContentVisible(!blogContentVisible);
	};

	return (
		<div className={classes.Blog}>
			<div className={classes.BlogHeader} onClick={toggleContentVisibility}>
				<p>{props.blog.title}</p>
				<p>{props.blog.author}</p>
			</div>

			<div className={contentClasses.join(' ')}>
				<p>{props.blog.url}</p>
				<p>{props.blog.likes} likes</p>
				<p>added by {props.blog.user.username}</p>
				<div className={classes.BlogButtonContainer}>
					<Button ButtonType='ButtonPrimary' ButtonSize='ButtonSmall' clicked={() => props.likedBlogPost(props.blog._id)}>Like</Button>
					{ localStorage.getItem('userId') === props.blog.user._id ? <Button ButtonType='ButtonDanger' ButtonSize='ButtonSmall' clicked={() => props.deleteBlogPost(props.blog._id)}>Delete</Button> : null}
				</div>
			</div>
		</div>
	);
};

export default Blog;