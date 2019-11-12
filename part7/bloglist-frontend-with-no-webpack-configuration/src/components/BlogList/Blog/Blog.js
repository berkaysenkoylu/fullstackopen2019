import React from 'react';

import classes from './Blog.module.css';

const Blog = (props) => {

	const goToBlogInfo = () => {
		props.onBlogInfoClicked(props.blog._id);
	};

	return (
		<div className={classes.Blog}>
			<div className={classes.BlogHeader} onClick={goToBlogInfo} id={props.id}>
				<p>{props.blog.title}</p>
				<p>{props.blog.author}</p>
			</div>
		</div>
	);
};

export default Blog;