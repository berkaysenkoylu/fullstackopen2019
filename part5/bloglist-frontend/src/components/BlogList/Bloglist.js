import React from 'react';

import classes from './Bloglist.module.css';
import Heading from '../../components/UI/Heading/Heading';
import Blog from './Blog/Blog';
// import {getAll} from '../../services/blogs';

const Bloglist = (props) => {
	// const [blogContent, setBlogContent] = useState([]);

	// useEffect(() => {
	//     getAll(props.token).then(result => {
	//         let blogs = result.blogs.map(blog => {
	//             return <Blog key={blog._id} blog={blog} />
	//         });
	//         setBlogContent(blogs);
	//     })
	// }, [props.token]);

	let sortedBloglist = props.blogList;

	sortedBloglist.sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0));

	const onLikedblogpost = (id) => {
		props.onBlogPostLiked(id);
	};

	const onDeleteBlogPost = (id) => {
		props.onBlogPostDeleted(id);
	};

	let blogContent = null;

	blogContent = sortedBloglist.map(blog => {
		return <Blog key={blog._id} blog={blog} likedBlogPost={onLikedblogpost} deleteBlogPost={onDeleteBlogPost} />;
	});

	return (
		<div className={classes.Bloglist}>
			<Heading HeadingType='HeadingSecondary'>Blogs</Heading>
			{blogContent}
		</div>
	);
};

export default Bloglist;