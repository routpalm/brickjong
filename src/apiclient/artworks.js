// ./src/apiclient/artworks.js
// Brick Jong
// purpose: provides functions for interacting with the backend to perform CRUD operations on artworks
// creation date: 2024-11-12
// authors: Nicholas Anthony, Brett DeWitt
// Brett: prototypes for functions
// Nick: modifications for debugging and pagination
// part of the frontend API client, this file is used to handle communication with the backend related to artworks, including fetching, creating, and deleting artworks.

import apiClient from './apiClient.js'; // imports the preconfigured axios instance for API communication


/**
 * fetches a list of artworks based on offset
 * 
 * @param {number} n - number of artworks to fetch.
 * @param {number} offset - starting position for fetching artworks.
 * @returns {Promise<Object[]>} an array of artworks if successful.
 * logs an error if the fetch operation fails.
 */
export const getArtworks = async (n, offset) => {
    try {
        const response = await apiClient.get(`/artworks`, {
            n: n,
            offset: offset,
        });
        return response.data;
    } catch (error) {
        console.error("Error getting artworks list:", n, offset, error);
    }
};

/**
 * fetches recent artworks from the backend and includes the number of likes for each artwork.
 * 
 * @returns {Promise<Object[]>} an array of artworks, each with an added 'likes' field.
 * throws an error if the fetch operation fails.
 */
export const getRecentArtworksWithLikes = async () => {
    try {
        const artworksResponse = await apiClient.get('/artworks');
        const artworks = artworksResponse.data;
        const artworksWithLikes = artworks.map((artwork) => {
            return {
                ...artwork,
                likes: artwork.likes?.length || 0, // adds 'likes' field with a count of likes
            };
        });


        return artworksWithLikes;
    } catch (error) {
        console.error('Error getting recent artworks with likes:', error);
        throw error;
    }
};

/**
 * fetches a specific artwork by its ID from the backend.
 * 
 * @param {number} artworkId - ID of the artwork to fetch.
 * @returns {Promise<Object>} the artwork object if successful.
 * logs an error if the fetch operation fails.
 */
export const getArtworkById = async (artworkId) => {
    try {
        const response = await apiClient.get(`/artworks/${artworkId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting artwork by ID:", artworkId, error);
    }
};

/**
 * sends a request to create a new artwork on the backend.
 * 
 * @param {Object} artworkData - an object containing details of the artwork to create (e.g., userId, algorithm, metadata).
 * @returns {Promise<Object>} the created artwork object if successful.
 * throws an error if the creation operation fails.
 */
export const createArtwork = async (artworkData) => {
    try {
        const response = await apiClient.post('/artworks', artworkData);
        return response.data;
    } catch (error) {
        console.error('Error creating artwork:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * deletes a specific artwork by its ID from the backend.
 * 
 * @param {number} artworkId - ID of the artwork to delete.
 * @returns {Promise<null>} `null` if deletion is successful.
 * logs an error if the deletion operation fails.
 */
export const deleteArtwork = async (artworkId) => {
    try {
        const response = await apiClient.delete(`/artworks/${artworkId}`);
        if (response.status === 204) {
            return response.data; // deletion successful
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error deleting artwork:", artworkId, error);
    }
};
