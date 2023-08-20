const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

const router = require("./routes");
const {
    errorHandler
} = require("./middlewares");

const server = express();
const port = 3333;

// CORS middleware configuration
server.use(cors());

// Body Parser middleware configuration
server.use(express.json());

// Log middleware configuration
server.use(morgan('dev'));

// Routing configuration
server.use(router);

// Errors Handler middleware configuration
server.use(errorHandler);

server.listen(port, () => {
    const date = new Date();
    console.log(`Node server started in ${date.toLocaleString()} at http://localhost:${port}`);
});

module.exports = server;