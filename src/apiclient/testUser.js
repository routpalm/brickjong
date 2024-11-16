// ./src/apiclient/testUser.js

import { getUserById, createUserByParams, createUserByObject, modifyUser, deleteUser } from "./users.js";


async function testCreateUserByParams(googleId, email, name) {
    try {
        const result = await createUserByParams(googleId, email, name);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while creating the user:", error);
    }
}

async function testCreateUserByObject(user){
    try {
        const result = await createUserByObject(user);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while creating the user:", user);
    }
}


async function testGetUserById(id) {
    try {
        const result = await getUserById(id);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while getting user by ID:", error);
    }
}


async function testModifyUser(userId, googleId, email, name) {
    try {
        const result = await modifyUser(userId, googleId, email, name);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while modifying the user:", error);
    }
}


async function testDeleteUser(userId) {
    try {
        const result = await deleteUser(userId);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while deleting the user:", error);
    }
}


// Example test calls - uncomment to run
// testCreateUser("12345", "user@example.com", "Test User");
// testGetUserById("2");
// testModifyUser("2", "12345", "user_modified@example.com", "Modified User");
testDeleteUser("4");
