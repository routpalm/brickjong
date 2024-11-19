// ./src/apiclient/testArtworks.js

import { getArtworks, getArtworkById, createArtwork, deleteArtwork } from "./artworks.js";
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/artworks';

async function testGetArtworks(n, offset) {
    try {
        const result = await getArtworks(n, offset);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while getting artworks list:", error);
    }
}


async function testGetArtworkById(artworkId) {
    try {
        const result = await getArtworkById(artworkId);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while getting artwork by ID:", error);
    }
}


async function testCreateArtwork(userId, params) {
    try {
        const result = await createArtwork(userId, params);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while creating the artwork:", error);
    }
}


async function testDeleteArtwork(artworkId) {
    try {
        const result = await deleteArtwork(artworkId);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while deleting the artwork:", error);
    }
}

// Sample data for testing
const sampleArtwork = {
    userId: 1, // Replace with a valid user ID in your database
    algorithm: 'Lines',
    exifData: {
        cameraMake: 'Canon',
        dateTime: '2023-11-15T10:00:00',
        latitude: 37.7749,
        longitude: -122.4194,
    },
    colorPalette: [
        'rgb(255, 0, 0)',
        'rgb(0, 255, 0)',
        'rgb(0, 0, 255)',
        'rgb(128, 128, 128)',
        'rgb(255, 255, 0)',
        'rgb(0, 255, 255)',
    ],
    pixelCluster: [
        [255, 0, 0, 255],
        [0, 255, 0, 255],
        [0, 0, 255, 255],
    ],
};

// Helper function to test the endpoints
const testArtworksAPI = async () => {
    try {
        // 1. Test creating a new artwork
        console.log('Creating a new artwork...');
        const createResponse = await axios.post(BASE_URL, sampleArtwork);
        console.log('Create Response:', createResponse.data);

        const createdArtworkId = createResponse.data.id; // Get the ID of the created artwork

        // 2. Test retrieving all artworks
        console.log('Retrieving all artworks...');
        const allArtworksResponse = await axios.get(BASE_URL);
        console.log('All Artworks Response:', allArtworksResponse.data);

        // 3. Test retrieving a specific artwork by ID
        console.log(`Retrieving artwork with ID: ${createdArtworkId}...`);
        const singleArtworkResponse = await axios.get(`${BASE_URL}/${createdArtworkId}`);
        console.log('Single Artwork Response:', singleArtworkResponse.data);
    } catch (error) {
        console.error('Error testing artworks API:', error.response?.data || error.message);
    }
};

// Run the test script
testArtworksAPI();



// Example test calls - uncomment to run
// testGetArtworks(10, 0);
// testGetArtworkById("15");
// testCreateArtwork("1", {param1: "val1", param2 "val2"});
// testDeleteArtwork("8");
