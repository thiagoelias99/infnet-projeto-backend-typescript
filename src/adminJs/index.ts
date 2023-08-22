import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from "@adminjs/sequelize";

import { authenticationConfig } from "./authenticationConfig";
import { sessionConfig } from "./sessionConfig";
import studentConfig from "./studentConfig";
import courseConfig from "./courseConfig";

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
});

const adminOptions = {
    resources: [studentConfig, courseConfig],
};

const admin = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    authenticationConfig,
    null,
    sessionConfig
);

export {
    admin,
    adminRouter
};