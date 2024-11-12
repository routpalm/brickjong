// ./src/apiclient/artworks.js

import apiclient from 'apiclient'
import apiClient from "apiclient";


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
        const response = await apiClient.get(`/artworks/${artworkId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting artwork list:", artworkId, error);
    }
}

// TODO: Work out params
export const createArtwork = async (userId, params) => {
    try {
        const response = await apiClient.post(`/artworks`, {
            params: params
        });
    } catch (error) {
        console.error("Error creating artwork:", userId, params, error)
    }
}

export const deleteArtwork = async (artworkId) => {
    try {
        const response = await apiClient.delete(`/artworks/${artworkId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting artwork:", artworkId, error);
    }
}
