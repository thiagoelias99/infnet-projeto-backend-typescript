import express from "express";
const router = express.Router();

import { RequestValidator, Authentication, AdminAuthentication } from "../middlewares";
import { CourseController } from "../controllers/CourseController";

const path = "/courses";

router.route(path)
    .post(AdminAuthentication, RequestValidator.body, CourseController.post)
    .get(AdminAuthentication, CourseController.get);

router.route(`${path}/info`)
    .get(Authentication, CourseController.getInfo);

router.route(`${path}/:uuid`)
    .all(RequestValidator.params)
    .get(AdminAuthentication, CourseController.getByUuid)
    .put(AdminAuthentication, RequestValidator.body, CourseController.put)
    .delete(AdminAuthentication, CourseController.del);

router.route(`${path}/:uuid/subscribe`)
    .patch(Authentication, RequestValidator.params, CourseController.subscribe);

router.route(`${path}/:uuid/unsubscribe`)
    .patch(Authentication, RequestValidator.params, CourseController.unsubscribe);

export default router;