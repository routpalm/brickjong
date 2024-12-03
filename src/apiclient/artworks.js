// ./src/apiclient/artworks.js

import apiclient from './apiClient.js'


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
        const artworksResponse = await apiclient.get('/artworks');
        const artworks = artworksResponse.data;
        const artworksWithLikes = artworks.map((artwork) => {
            return {
                ...artwork,
                likes: artwork.likes?.length || 0, 
            };
        });

        return artworksWithLikes;
    } catch (error) {
        console.error('Error getting recent artworks with likes:', error);
        throw error;  
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
        if (response.status === 204) {
            return response.data;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error deleting artwork:", artworkId, error);
    }
}
