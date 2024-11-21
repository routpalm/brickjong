// ./src/apiclient/apiClient.js

import axios from 'axios'


const apiClient = axios.create({
    baseURL: REACT_APP_BACK_END_API_URL,
    headers: {
        'content-type': 'application/json'
    },
});


export default apiClient;
