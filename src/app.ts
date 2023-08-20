// const { SqlError } = require("mariadb");
const server = require("./server");

function startApp() {
    server
}

try {
    startApp();
} catch (error) {
    console.log("Server execution failed :(")
    console.log(error);
}