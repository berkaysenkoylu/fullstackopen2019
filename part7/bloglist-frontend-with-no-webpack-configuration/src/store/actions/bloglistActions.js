import * as actionTypes from './actionTypes';
import axiosBloglist from '../../axiosBloglist';

export const getAllBlogs = () => {
	return async dispatch => {
		try {
			const response = await axiosBloglist.get('');

			dispatch({
				type: actionTypes.GET_BLOGLIST,
				data: response.data
			});
		}
		catch(exception) {
			console.log(exception.response);
		}
		// const response = await axiosBloglist.get('');

		// dispatch({
		//     type: actionTypes.GET_BLOGLIST,
		//     data: response.data
		// });
	};
};

export const createNewBlog = (token, blogPost) => {
	let config = {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	};

	return dispatch => {
		const request = axiosBloglist.post('', blogPost, config);

		request.then(response => {

			dispatch({
				type: actionTypes.CREATE_NEW_BLOG,
				data: response.data.data
			});
		}).then(() => {
			// If we don't refetch, then added by <username> won't work, since
			// creating a new user doesn't populate user field in the database
			dispatch(getAllBlogs());
		}).catch(error => error.response.data.message);
	};
};

export const likeBlogPost = (blogPostId) => {
	return dispatch => {

		const request = axiosBloglist.patch('/' + blogPostId + '/like');

		request.then(response => {
			dispatch({
				type: actionTypes.LIKE_BLOGPOST,
				data: response.data.data
			});

		}).catch(error => error.response.data.message);
	};
};

export const commentOnBlogPost = (blogPostId, content) => {
	return dispatch => {
		const request = axiosBloglist.patch('/' + blogPostId + '/comments', {content});

		request.then(response => {
			dispatch({
				type: actionTypes.COMMENT_BLOGPOST,
				data: response.data.data
			});
		}).catch(error => error.response.data.message);
	};
};

export const deleteBlogPost = (token, blogPostId) => {
	let config = {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	};

	return async dispatch => {
		try {
			const response = await axiosBloglist.delete('/' + blogPostId, config);

			dispatch({
				type: actionTypes.DELETE_BLOGPOST,
				data: response.data.data
			});

			return Promise.resolve({ status: response.status, message: response.data.message});
		}
		catch(error)
		{
			return Promise.resolve({ status: error.response.status, message: error.response.data.message});
		}
	};
};