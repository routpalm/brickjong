// ./src/apiclient/likes.js

import apiClient from "./apiClient.js";


export const getLikeById = async (likeId) => {
    try {
        const response = await apiClient.get(`/likes/${likeId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting like:", likeId, error);
        throw error;
    }
}

export const getLikesByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/likes`);
        return response.data;
    } catch (error) {
        console.error("Error getting likes for user:", userId, error);
        throw error;
    }
}


export const getLikesCountByArtworkId = async (artworkId) => {
    try {
        const response = await apiClient.get(`/likes`);
        const allLikes = response.data;
        const filteredLikes = allLikes.filter((like) => like.artworkId === artworkId);
        
        return filteredLikes.length;
    } catch (error) {
        console.error("Error getting likes count for artwork:", artworkId, error);
        throw error;
    }
};

// TODO: export const modifyLike = async (likeId, userId, artworkId) => {}

export const createLikeByParam = async (userId, artworkId) => {
    try {
        const response = await apiClient.post(`/likes`, {
            userId: userId,
            artworkId: artworkId
        })
        return response.data;
    } catch (error) {
        console.error("Error creating like:", userId, artworkId, error);
        throw error;
    }
}

export const createLikeByObject = async (like) => {
    try {
        const response = await apiClient.post(`/likes`, like);
        return response.data;
    } catch (error) {
        console.error("Error creating like:", like, error);
        throw error;
    }
}

// TODO: export const modifyLike = async (likeId, userId, artworkId) => {}

export const deleteLike = async (likeId) => {
    try {
        const response = await apiClient.delete(`/likes/${likeId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting Like:", likeId, error);
        throw error;
    }
}
