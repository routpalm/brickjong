// ./src/apiclient/apiClient.js

import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'https://visualoom-8a10785743bd.herokuapp.com',
    headers: {
        'content-type': 'application/json'
    },
});


export default apiClient;
