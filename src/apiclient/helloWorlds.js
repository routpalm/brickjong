// ./src/apiclient/helloWorlds.js
// purpose: provides functions to test backend capabilities
// creation date: 2024-11-01
// author: Brett DeWitt


import apiClient from './apiClient.js';


/**
 * Fetches a list of HelloWorld objects
 *
 * @param {number} n - The number of HelloWorld objects to retrieve.
 * @param {number} offset - The starting point in the list to retrieve results from (for pagination).
 * @returns {Array} - An array of HelloWorld objects.
 * @throws {Error} - If an error occurs during the request.
 */
export const getHelloWorlds = async (n, offset) => {
    try {
        const response = await apiClient.(`/helloworlds/`, {
            params: {
                n: n,
                offset: offset
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching HelloWorlds: ", error);
        throw error; // rethrow and let the caller handle it
    }
}

/**
 * Fetches a single HelloWorld object by its ID.
 *
 * @param {number} helloWorldId - The ID of the HelloWorld object to retrieve.
 * @returns {Object} - The HelloWorld object.
 * @throws {Error} - If an error occurs during the request.
 */
export const getHelloWorldById = async (helloWorldId) => {
    try {
        const response = await apiClient.get(`/helloWorlds/${helloWorldId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching HelloWorld by id: ", error);
        throw error; // rethrow and let the caller handle it
    }
}

/**
 * Creates a new HelloWorld object with the provided message.
 *
 * @param {string} message - The message for the new HelloWorld object.
 * @returns {Object} - The created HelloWorld object.
 * @throws {Error} - If an error occurs during the request.
 */
export const createHelloWorld = async (message) => {
    try {
        const response = await apiClient.post(`/helloWorlds`, { message });
        return response.data;
    } catch (error) {
        console.error("Error creating HelloWorld", error);
        throw error; // rethrow and let the caller handle it
    }
}

/**
 * Modifies an existing HelloWorld object by its ID and updates its message.
 *
 * @param {number} helloWorldId - The ID of the HelloWorld object to modify.
 * @param {string} message - The new message to update the HelloWorld object with.
 * @returns {Object} - The updated HelloWorld object.
 * @throws {Error} - If an error occurs during the request.
 */
export const modifyHelloWorldById = async (helloWorldId, message) => {
    try {
        const response = await apiClient.put(`/helloWorlds/${helloWorldId}`, { message });
        return response.data;
    } catch (error) {
        console.error("Error modifying HelloWorld", error);
        throw error; // rethrow and let the caller handle it
    }
}

/**
 * Deletes a HelloWorld object by its ID.
 *
 * @param {number} helloWorldId - The ID of the HelloWorld object to delete.
 * @returns {Object} - The response from the deletion request.
 * @throws {Error} - If an error occurs during the request.
 */
export const deleteHelloWorldById = async (helloWorldId) => {
    try {
        const response = await apiClient.delete(`/helloWorlds/${helloWorldId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting HelloWorld", error);
        throw error; // rethrow and let the caller handle it
    }
}
