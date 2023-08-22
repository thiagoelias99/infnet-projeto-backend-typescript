import express from "express";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import router from "./routes";
import { errorHandler } from "./middlewares";

import { admin, adminRouter } from "../adminJs";

const server = express();
const port = 3333;

// CORS middleware configuration
server.use(cors());

// Body Parser middleware configuration
server.use(express.json());

// Log middleware configuration
server.use(morgan("dev"));

//Admin Js
server.use(admin.options.rootPath, adminRouter);

// Routing configuration
server.use(router);

// Errors Handler middleware configuration
server.use(errorHandler);

server.listen(port, () => {  
    const log = console.log;
    setTimeout(() => {
        console.clear();
        const date = new Date();
        log(`Node server started in ${date.toLocaleString()} at ${chalk.blue(`http://localhost:${port}`)}`);
        log(`Access ${chalk.bold.blue("Api Documentation")} at ${chalk.blue(`http://localhost:${port}`)}`);
        log(`Access ${chalk.bold.blue("Administration Panel")} at ${chalk.blue(`http://localhost:${port}${admin.options.rootPath}`)}`);
        log(`\nDeveloped by ${chalk.bold.green("Thiago Elias")}`);
        log("Repo https://github.com/thiagoelias99/infnet-projeto-backend-typescript\n\n\n");
    }, 2000);
});

export default server;