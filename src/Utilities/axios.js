import axios from 'axios';

/* eslint-disable */

// Add a request interceptor
axios.interceptors.request.use((config) => {
    //  Do something before request is sent
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
    //  Do something before response is sent
    return response;
}, (error) => {
    // Do something before response error
    return Promise.reject(error);
});

/* eslint-enable */

export default axios;
