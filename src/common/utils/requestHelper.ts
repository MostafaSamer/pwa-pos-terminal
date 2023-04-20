import axios from 'axios';
import { API_BASE_URL } from './constant';

axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.log("REQUESTHELPER: ERROR: ", error)
        return Promise.reject(error);
    },
);

axios.defaults.baseURL = API_BASE_URL;

export default axios;
