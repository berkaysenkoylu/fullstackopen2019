import axios from 'axios';

const instance = axios.create({
	baseURL: BACKEND_URL + 'api/users'
});

export default instance;