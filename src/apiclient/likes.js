// ./src/apiclient/likes.js
// Brick Jong
// purpose: provides functions for interacting with the backend to manage likes on artworks
// creation date: 2024-11-12
// authors: Nicholas Anthony, Brett DeWitt
// Nick: modifications for initial prototypes to better integrate into the frontend components
// Brett: initial prototypes for functions
// part of the frontend API client, this file handles communication with the backend for CRUD operations on likes, including fetching, creating, and deleting likes
// modifications: none

import apiClient from "./apiClient.js"; // imports the preconfigured axios instance

/**
 * fetches a specific like by its ID from the backend.
 * 
 * @param {number} likeId - ID of the like to fetch.
 * @returns {Promise<Object>} the like object if successful.
 * throws an error if the fetch operation fails.
 */
export const getLikeById = async (likeId) => {
    try {
        const response = await apiClient.get(`/likes/${likeId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting like:", likeId, error);
        throw error;
    }
};

/**
 * fetches all likes for a specific user from the backend.
 * 
 * @param {number} userId - ID of the user whose likes are being fetched.
 * @returns {Promise<Object[]>} an array of like objects if successful.
 * throws an error if the fetch operation fails.
 */
export const getLikesByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/likes`);
        return response.data;
    } catch (error) {
        console.error("Error getting likes for user:", userId, error);
        throw error;
    }
};

/**
 * creates a new like using user ID and artwork ID as parameters.
 * 
 * @param {number} userId - ID of the user creating the like.
 * @param {number} artworkId - ID of the artwork being liked.
 * @returns {Promise<Object>} the created like object if successful.
 * throws an error if the creation operation fails.
 */
export const createLikeByParam = async (userId, artworkId) => {
    try {
        const response = await apiClient.post(`/likes`, {
            userId: userId,
            artworkId: artworkId,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating like:", userId, artworkId, error);
        throw error;
    }
};

/**
 * creates a new like using a like object.
 * 
 * @param {Object} like - an object containing details of the like (e.g., userId, artworkId).
 * @returns {Promise<Object>} the created like object if successful.
 * throws an error if the creation operation fails.
 */
export const createLikeByObject = async (like) => {
    try {
        const response = await apiClient.post(`/likes`, like);
        return response.data;
    } catch (error) {
        console.error("Error creating like:", like, error);
        throw error;
    }
};

/**
 * deletes a specific like by its ID from the backend.
 * 
 * @param {number} likeId - ID of the like to delete.
 * @returns {Promise<null>} `null` if deletion is successful.
 * throws an error if the deletion operation fails.
 */
export const deleteLike = async (likeId) => {
    try {
        const response = await apiClient.delete(`/likes/${likeId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting Like:", likeId, error);
        throw error;
    }
};
