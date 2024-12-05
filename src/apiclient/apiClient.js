// ./src/apiclient/apiClient.js
// Brick Jong
// purpose: sets up the axios API client for making HTTP requests to the backend
// creation date: 2024-11-12
// authors:  Brett DeWitt
// part of the frontend system, this file is used to handle communication with the backend by creating a reusable instance of axios with predefined settings.
// modifications: none

import axios from 'axios' // axios is used for making HTTP requests easily with support for interceptors and default configuration

// creates an axios instance with a default base URL and JSON headers
// baseURL is fetched from the environment variables (REACT_APP_BACK_END_API_URL)
// this allows the app to adapt to different environments like development, staging, or production
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BACK_END_API_URL, // base API endpoint for backend services
    headers: {
        'content-type': 'application/json' // ensures all requests send JSON data
    },
});

// exports the axios instance for use across the frontend
// all API-related calls should use this instance to ensure consistency
export default apiClient;
