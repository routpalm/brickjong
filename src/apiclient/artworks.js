// ./src/apiclient/artworks.js

import apiclient from './apiClient.js'
import { getLikesCountByArtworkId } from './likes.js';

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


export const getRecentArtworksWithLikes = async () => {
    try {
        const artworksResponse = await apiclient.get(`/artworks`, {
            params: {
                limit: 20,
                order: 'desc',
            },
        });
        const artworks = artworksResponse.data;

        const artworksWithLikes = await Promise.all(
            artworks.map(async (artwork) => {
                const likes = await getLikesCountByArtworkId(artwork.id);
                return {
                    ...artwork,
                    likes: likes, 
                };
            })
        );

        return artworksWithLikes;
    } catch (error) {
        console.error('Error getting recent artworks with likes:', error);
    }
};

export const getRecentArtworks = async () => {
    try {
        const response = await apiclient.get(`/artworks`, {
            params: {
                limit: 20,
                order: 'desc', 
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting recent artworks:", error);
    }
};

export const getMostLikedArtworks = async () => {
    try {
        const response = await apiclient.get(`/artworks`, {
            params: {
                limit: 20,
                order: 'desc', 
                sortBy: 'likes'
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting most liked artworks:", error);
    }
};


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
