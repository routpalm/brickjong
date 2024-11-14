// ./src/apiclient/testArtworks.js

import { getArtworks, getArtworkById, createArtwork, deleteArtwork } from "./artworks.js";


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


// Example test calls - uncomment to run
// testGetArtworks(10, 0);
// testGetArtworkById("15");
// testCreateArtwork("1", {param1: "val1", param2 "val2"});
// testDeleteArtwork("8");
