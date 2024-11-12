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

// TODO: export const modifyLike = async (likeId, userId, artworkId) => {}

export const createLike = async (userId, artworkId) => {
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

// TODO: export const modifyLike = async (likeId, userId, artworkId) => {}

export const deleteLike = async (likeId) => {
    try {
        const response = await apiClient.delete(`/likes/${likeId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting Like", likeId, error);
        throw error;
    }
}
