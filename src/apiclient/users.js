// ./src/apiclient/user.js
// Brick Jong
// purpose: provides functions for interacting with the backend to manage user-related data
// creation date: 2024-11-12
// authors: Nicholas Anthony, Brett DeWitt
// Nick: modifications for initial prototypes to better integrate into the frontend components
// Brett: initial prototypes for functions
// part of the frontend API client, this file handles communication with the backend for CRUD operations on users, as well as mapping JWTs to user IDs

import apiClient from "./apiClient.js"; // preconfigured axios instance
import { setAuthToken } from "./auth.js"; // utility to set authorization header for requests

/**
 * fetches a user by their ID from the backend.
 * 
 * @param {number} id - ID of the user to fetch.
 * @returns {Promise<Object>} the user object if successful.
 * throws an error if the fetch operation fails.
 */
export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user by id ", id, error);
        throw error;
    }
};

/**
 * fetches artworks created by a user, with pagination options.
 * 
 * @param {number} userId - ID of the user whose artworks are being fetched.
 * @param {number} [limit=20] - maximum number of artworks to fetch.
 * @param {number} [offset=0] - number of artworks to skip before starting the fetch.
 * @returns {Promise<Object[]>} an array of artworks if successful.
 * throws an error if the fetch operation fails.
 */
export const getUserArtworks = async (userId, limit = 20, offset = 0) => {
    try {
        const response = await apiClient.get(`/users/${userId}/artwork?limit=${limit}&offset=${offset}`);
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user artworks:', error);
        throw error;
    }
};

/**
 * maps a JWT token to a user ID by sending the token to the backend for decoding.
 * 
 * @returns {Promise<number>} the user ID if successful.
 * throws an error if the mapping operation fails.
 */
export const mapJWTToUserId = async () => {
    const token = localStorage.getItem('jwt'); // retrieve JWT from storage
    if (!token) throw new Error('JWT not found');
    setAuthToken(token);
    try {
        const response = await apiClient.get('/users/map-jwt');
        console.log("Decoded JWT Response:", response.data);
        return response.data.userId;
    } catch (error) {
        console.error('Error mapping JWT to user ID:', error);
        throw error;
    }
};

/**
 * fetches the profile information of the currently authenticated user.
 * 
 * @returns {Promise<Object>} the user profile object if successful.
 * throws an error if the fetch operation fails.
 */
export const fetchUserProfile = async () => {
    const token = localStorage.getItem('jwt'); // retrieve JWT from localstorage
    try {
        const response = await apiClient.get('/users/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};


/**
 * creates a user using individual parameters for their details.
 * 
 * @param {string} googleId - the user's Google ID.
 * @param {string} email - the user's email address.
 * @param {string} name - the user's name.
 * @returns {Promise<Object>} the created user object if successful.
 * throws an error if the creation operation fails.
 */
export const createUserByParams = async (googleId, email, name) => {
    try { // post a user to the backend to be created and stored
        const response = await apiClient.post(`/users`, {
            googleId: googleId,
            email: email,
            name: name,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating user", googleId, email, name, error);
        throw error;
    }
};

/**
 * creates a user using a user object for their details.
 * 
 * @param {Object} user - an object containing the user's details (e.g., googleId, email, name).
 * @returns {Promise<Object>} the created user object if successful.
 * throws an error if the creation operation fails.
 */
export const createUserByObject = async (user) => {
    try {
        const response = await apiClient.post(`/users`, user);
        return response.data;
    } catch (error) {
        console.error("Error creating user", user, error);
        throw error;
    }
};

/**
 * modifies the details of an existing user.
 * 
 * @param {number} userId - ID of the user to modify.
 * @param {string} googleId - the user's updated Google ID.
 * @param {string} email - the user's updated email address.
 * @param {string} name - the user's updated name.
 * @returns {Promise<Object>} the updated user object if successful.
 * throws an error if the modification operation fails.
 */
export const modifyUser = async (userId, googleId, email, name) => {
    try {
        const response = await apiClient.put(`/users/${userId}`, {
            userId: userId,
            googleId: googleId,
            email: email,
            name: name,
        });
        return response.data;
    } catch (error) {
        console.error("Error modifying user", userId, googleId, email, name, error);
        throw error;
    }
};

/**
 * deletes a user by their ID from the backend.
 * 
 * @param {number} userId - ID of the user to delete.
 * @returns {Promise<null>} `null` if deletion is successful.
 * throws an error if the deletion operation fails.
 */
export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user", userId, error);
        throw error;
    }
};
