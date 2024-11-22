// ./src/apiclient/artworks.js

import apiclient from 'apiclient'
import apiClient from "apiclient";


export const getArtworks = async (n, offset) => {
    try {
        const response = await apiClient.get(`/artworks`, {
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

// TODO: Work out params
export const createArtwork = async (artworkData) => {
    try {
        const response = await apiclient.post('/artworks', artworkData);
        return response.data;
    } catch (error) {
        console.error('Error creating artwork:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteArtwork = async (artworkId) => {
    try {
        const response = await apiclient.delete(`/artworks/${artworkId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting artwork:", artworkId, error);
    }
}
