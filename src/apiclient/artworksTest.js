// ./src/apiclient/testArtworks.js

import { getArtworks, getArtworkById, createArtworkByParam, createArtworkByObject, deleteArtwork } from "./artworks.js";


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
