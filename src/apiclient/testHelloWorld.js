// ./src/apiclient/testHelloWorld.js

import { getHelloWorlds, getHelloWorldById, createHelloWorld, modifyHelloWorldById, deleteHelloWorldById } from "./helloWorlds.js"


async function testCreateHelloWorld(message) {
    try {
        const result = await createHelloWorld({ message: message });
        console.log(result);
    } catch (error) {
        console.error("An error occurred while creating HelloWorld:", error);
    }
}

async function testGetHelloWorldById(helloWorldId) {
    try {
        const result = await getHelloWorldById(helloWorldId);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while getting HelloWorld by id:", error);
    }
}

async function testGetHelloWorlds(n, offset) {
    try {
        const result = await getHelloWorlds(n, offset);
        console.log(result);
    } catch (error) {
        console.error("An error occurred while getting HelloWorlds:", error);
    }
}

async function testModifyHelloWorldById(helloWorldId, message) {
    try {
        const result = await modifyHelloWorldById(helloWorldId, {
            message: message
        })
        console.log(result);
    } catch (error) {
        console.error("An error occurred while modifying HelloWorld:", error);
    }
}

async function testDeleteHelloWorldById(helloWorldId) {
    try {
        const result = await deleteHelloWorldById(helloWorldId)
        console.log(result);
    } catch (error) {
        console.error("An error occurred while deleting HelloWorld:", error);
    }
}

// test
// testCreateHelloWorld("Hello World from testHelloWorld.js!");
// testGetHelloWorldById(1);
testGetHelloWorlds(2, 1);
// testModifyHelloWorldById(3, "Modified HelloWorld from testHelloWorld.js!");
// testDeleteHelloWorldById(1)
