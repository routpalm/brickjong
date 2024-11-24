// ./src/apiclient/testArtworks.js

import { getArtworks, getArtworkById, createArtworkByParam, createArtworkByObject, deleteArtwork } from "./artworks.js";

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


async function testCreateArtworkByParam(userId,
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
                                 param8) {
    try {
        const result = await createArtworkByParam(
            userId,
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
            param8
        );
        console.log(result);
    } catch (error) {
        console.error("An error occurred while creating the artwork:", error);
    }
}

async function testCreateArtworkByObject( artwork ){
    try {
        const result = await createArtworkByObject( artwork );
        console.log(result);
    } catch (error) {
        console.error("An error occurred while creating the artwork:", error)
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
// testGetArtworks(1, 0);
// testGetArtworkById(1);
// testCreateArtwork(
//     1,
//     13245,
//     "#ffffff",
//     "#ffffff",
//     "#ffffff",
//     "#ffffff",
//     "#ffffff",
//     "#ffffff",
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0);
// testDeleteArtwork("8");

testCreateArtworkByObject( {
    userId: 1,
    algorithm: "algorithm",
    seed: 12345,
    colVibrant: "#00ff00",
    colLightVibrant: "#00ff00",
    colDarkVibrant: "#00ff00",
    colMuted: "#00ff00",
    colLightMuted: "#00ff00",
    colDarkMuted: "#00ff00",
    param1: 1,
    param2: 2,
    param3: 3,
    param4: 4,
    param5: 5,
    param6: 6,
    param7: 7,
    param8: 8
})
