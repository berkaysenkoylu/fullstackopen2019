import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3001/api/blogs'
});

export default instance;

