// ./src/apiclient/artworks.js

import apiClient from "./apiClient.js";


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
        const response = await apiClient.get(`/artworks/${artworkId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting artwork list:", artworkId, error);
    }
}

export const createArtworkByParam = async (userId,
                                    algorithm,
                                    seed,
                                    colVibrant,
                                    colLightVibrant,
                                    colDarkVibrant,
                                    colMuted,
                                    colLightMuted,
                                    colDarkMuted,
                                    param1,
                                    param2,
                                    param3,
                                    param4,
                                    param5,
                                    param6,
                                    param7,
                                    param8) => {
    try {
        const response = await apiClient.post(`/artworks`, {
            userId: userId,
            algorithm: algorithm,
            seed: seed,
            colVibrant: colVibrant,
            colLightVibrant: colLightVibrant,
            colDarkVibrant: colDarkVibrant,
            colMuted: colMuted,
            colLightMuted: colLightMuted,
            colDarkMuted: colDarkMuted,
            param1: param1,
            param2: param2,
            param3: param3,
            param4: param4,
            param5: param5,
            param6: param6,
            param7: param7,
            param8: param8
        });
        return response.data;
    } catch (error) {
        console.error("Error creating artwork:", error)
    }
}

export const createArtworkByObject = async ( artwork ) => {
    try {
        const response = await apiClient.post(`/artworks`, artwork);
        return response.data;
    } catch (error) {
        console.error("Error creating artwork:", error)
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
