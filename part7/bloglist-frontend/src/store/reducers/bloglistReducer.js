import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state=initialState, action) => {
	let copiedBloglist = [...state];
	switch(action.type) {
	case actionTypes.GET_BLOGLIST:
		state = action.data.blogs;
		break;
	case actionTypes.CREATE_NEW_BLOG:
		copiedBloglist = copiedBloglist.concat(action.data);
		state = copiedBloglist;
		break;
	case actionTypes.LIKE_BLOGPOST:
		copiedBloglist = copiedBloglist.map(blog => {
			if (blog._id === action.data._id){
				blog.likes = action.data.likes;
			}
			return blog;
		});
		state = copiedBloglist;
		break;
	case actionTypes.COMMENT_BLOGPOST:
		copiedBloglist = copiedBloglist.map(blog => {
			if(blog._id === action.data._id){
				blog.comments = action.data.comments;
			}
			return blog;
		});
		state = copiedBloglist;
		break;
	case actionTypes.DELETE_BLOGPOST:
		copiedBloglist = copiedBloglist.filter(post => post._id !== action.data._id);
		state = copiedBloglist;
		break;
	default:
		break;
	}

	return state;
};

export default reducer;