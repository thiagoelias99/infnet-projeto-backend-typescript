import express from "express";

import StudentsRouter from "./studentsRouter";
import CoursesRouter from "./coursesRouter";
import WelcomeRoute from "./welcome";
import Route404 from "./404";

const router = express.Router();

router.use(WelcomeRoute);
router.use(StudentsRouter);
router.use(CoursesRouter);

router.use(Route404);

export default router;