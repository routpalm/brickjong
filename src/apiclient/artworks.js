// ./src/apiclient/artworks.js

import apiclient from './apiClient.js'

const BASE_URL = 'https://visualoom-8a10785743bd.herokuapp.com/artworks';

export const createArtwork = async (artworkData) => {
    try {
        const response = await apiclient.post('/artworks', artworkData);
        return response.data;
    } catch (error) {
        console.error('Error creating artwork:', error.response?.data || error.message);
        throw error;
    }
};

export const getArtworks = async (n, offset) => {
    try {
        const response = await apiclient.get(`/artworks`, {
            n: n,
            offset: offset
        })
        return response.data;
    } catch (error) {
        console.error("Error getting artworks list:", n, offset, error);
    }
}

export const getArtworkById = async (artworkId) => {
    try {
        const response = await apiclient.get(`/artworks/${artworkId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting artwork list:", artworkId, error);
    }
}

export const deleteArtwork = async (artworkId) => {
    try {
        const response = await apiclient.delete(`/artworks/${artworkId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting artwork:", artworkId, error);
    }
}
