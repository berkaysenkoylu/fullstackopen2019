import axios from 'axios';


// 

const instance = axios.create({
    baseURL: `http://api.weatherstack.com`
});

export default instance;

