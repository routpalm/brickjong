// ./src/apiclient/testLikes.js

import { getLikeById, createLike, deleteLike } from "./likes.js";


async function testGetLikeById(likeId) {
    try {
        const result = await getLikeById(likeId);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while getting like by ID:", error);
    }
}


async function testCreateLike(userId, artworkId) {
    try {
        const result = await createLike(userId, artworkId);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while creating the like:", error);
    }
}


async function testDeleteLike(likeId) {
    try {
        const result = await deleteLike(likeId);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while deleting the like:", error);
    }
}


// Example calls - uncomment to run
// testCreateLike("1", "10");
// testGetLikeById("5");
// testDeleteLike("6");
