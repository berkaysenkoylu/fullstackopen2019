import axiosAuth from '../axiosAuth';

export const loginUser = async (credentials) => {
	const response = await axiosAuth.post('/login', credentials);

	return response.data;
};

export const getUsers = () => {
	const request = axiosAuth.get('/');

	return request.then(response => response.data);
};