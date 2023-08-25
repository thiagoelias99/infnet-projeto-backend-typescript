import AdminJS, {AdminJSOptions } from "adminjs";
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

const adminOptions: AdminJSOptions = {
    resources: [studentConfig, courseConfig],
    // rootPath: "/admin",
    dashboard: {
        component: AdminJS.bundle("./components/Dashboard.tsx"),
        // component: componentLoader.add("Dashboard","./components/Dashboard.tsx"),
    }
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