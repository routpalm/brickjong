// ./src/apiclient/user.js

import apiClient from "./apiClient.js";
import { setAuthToken } from "./auth.js";


export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user by id ", id, error);
        throw error;
    }
}

export const getUserArtworks = async (userId, limit = 20, offset = 0) => {
    try {
        const response = await apiClient.get(`/users/${userId}/artwork?limit=${limit}&offset=${offset}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user artworks:', error);
        throw error;
    }
};

export const mapJWTToUserId = async () => {
    const token = localStorage.getItem('jwt'); // Retrieve JWT from storage
    if (!token) throw new Error('JWT not found');
    setAuthToken(token);
    try {
        const response = await apiClient.get('/users/map-jwt');
        return response.data.userId; // Extract user ID from the response
    } catch (error) {
        console.error('Error mapping JWT to user ID:', error);
        throw error;
    }
};

export const fetchUserProfile = async () => {
    const token = localStorage.getItem('jwt');
    try {
        const response = await apiClient.get('/users/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};


// TODO: export const getUserLikes = async (id) => {}

export const createUserByParams = async (googleId,
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
        throw error;
    }
}

export const createUserByObject = async ( user ) => {
    try {
        const response = await apiClient.post(`/users`, user)
    } catch (error) {
        console.error("Error creating user", user, error);
        throw error;
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
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user", userId, error);
        throw error;
    }
}