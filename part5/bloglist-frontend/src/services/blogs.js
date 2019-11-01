import axiosBloglist from '../axiosBloglist';

export const getAll = () => {
	const request = axiosBloglist.get('');

	return request.then(response => response.data);
};

export const createBlogPost = (token, blogPost) => {
	let config = {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	};

	const request = axiosBloglist.post('', blogPost, config);

	return request.then(response => response.data).catch(error => error.response.data.message);
};

export const likeBlogPost = (blogPostId) => {

	const request = axiosBloglist.patch('/' + blogPostId);

	return request.then(response => response.data).catch(error => error.response.data.message);
};

export const deleteBlogPost = async (token, blogPostId) => {
	let config = {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	};

	const response = await axiosBloglist.delete('/' + blogPostId, config);

	return response;
};