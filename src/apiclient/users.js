// ./src/apiclient/user.js

import apiClient from "./apiClient.js";


export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user by id ", id, error);
    }
}

// TODO: export const getUserArtworks = async (id) => {}

// TODO: export const getUserLikes = async (id) => {}

export const createUser = async (googleId,
                                 email,
                                 name) => {
    try {
        const response = await apiClient.post(`/users`, {
            googleId: googleId,
            email: email,
            name: name,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating user", googleId, email, name, error);
    }
}

export const modifyUser = async (userId,
                                 googleId,
                                 email,
                                 name) => {
    try {
        const response = await apiClient.put(`/users/${userId}`, {
            userId: userId,
            googleId: googleId,
            email: email,
            name: name,
        })
        return response.data;
    } catch (error) {
        console.error("Error modifying user", userId, googleId, email, name, error);
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user", userId, error);
    }
}
