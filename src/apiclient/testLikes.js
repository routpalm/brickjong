// ./src/apiclient/testLikes.js

import { getLikeById, createLikeByParam, createLikeByObject, deleteLike } from "./likes.js";


async function testGetLikeById(likeId) {
    try {
        const result = await getLikeById(likeId);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while getting like by ID:", error);
    }
}


async function testCreateLikeByParam(userId, artworkId) {
    try {
        const result = await createLikeByParam(userId, artworkId);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while creating the like:", error);
    }
}

async function testCreateLikeByObject(like) {
    try {
        const result = await createLikeByObject(like);
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
// testCreateLikeByParam(1, 1);
// testCreateLikeByObject({
//     userId: 1,
//     artworkId: 1,
// })
testGetLikeById(1);
// testDeleteLike("6");
