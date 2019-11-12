import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import classes from './Bloglist.module.css';
import Togglable from '../Utility/Togglable/Togglable';
import Heading from '../UI/Heading/Heading';
import CreateBlog from '../../components/BlogList/CreateBlog/CreateBlog';
import Blog from './Blog/Blog';
import BlogInfo from './BlogInfo/BlogInfo';

const Bloglist = (props) => {
	let sortedBloglist = props.blogList;

	sortedBloglist.sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0));

	const onLikedblogpost = (id) => {
		props.onBlogPostLiked(id);
	};

	const onDeleteBlogPost = (id) => {
		props.onBlogPostDeleted(id);
	};

	const handleBlogInfo = (id) => {
		props.history.push('blogs/' + id);
	};

	const handleBlogCommented = (data) => {
		props.onBlogPostCommented(data);
	};

	let blogContent = null;

	blogContent = sortedBloglist.map(blog => {
		return <Blog key={blog._id} blog={blog} likedBlogPost={onLikedblogpost} deleteBlogPost={onDeleteBlogPost} onBlogInfoClicked={handleBlogInfo} id="blog_header_id" />;
	});

	let blogListContent = (
		<>
			<Togglable toggleName='Create a new blog' ref={props.blogCreateReference} id="create_toggle_button">
				<CreateBlog token={props.token} newBlogCreated={props.newBlogCreate} blogCreateCancelled={props.canceledBlogCreate} />
			</Togglable>
			<Heading HeadingType='HeadingSecondary'>Blogs</Heading>
			{blogContent}
		</>
	);

	return (
		<div className={classes.Bloglist}>
			<Route exact path="/blogs" render={() => blogListContent} />
			<Route path="/blogs/:id" render={() => <BlogInfo
				bloglist={sortedBloglist}
				likedBlogPost={onLikedblogpost}
				deleteBlogPost={onDeleteBlogPost}
				blogCommented={handleBlogCommented}
				{...props} />} />
		</div>
	);
};

export default (withRouter(Bloglist));