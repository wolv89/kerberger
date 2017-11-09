import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://kerberger-171ca.firebaseio.com/'
});

export default instance;