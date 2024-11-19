// ./src/apiclient/apiClient.js

import axios from 'axios'


const apiClient = axios.create({
    baseURL: process.env.BACK_END_API_URL || 'http://localhost:3001',
    headers: {
        'content-type': 'application/json'
    },
});


export default apiClient;
