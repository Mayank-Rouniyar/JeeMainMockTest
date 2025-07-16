import {Router} from "express"
import { authorizeRole } from "../middlewares/autharizeRole.middleware.js"
import 
   { 
    createTest,
    getAllTest,
    updateTest,
    publishTest,
    deleteTest,
    getPublishedTest,
    getTestById,
    addQuestionToTest,
    unPublishTest,
    removeQuestionFromTest,
    getTestWithQuestion
   } from "../controllers/test.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router=Router()
router.use(verifyJWT)
router.post("/",authorizeRole("ADMIN"), createTest);
router.get("/", getAllTest);
router.get("/published", getPublishedTest);
router.get("/:id", getTestById);
router.patch("/:id",authorizeRole("ADMIN"), updateTest);
router.delete("/:id",authorizeRole("ADMIN"), deleteTest);
router.patch("/publish/:id",authorizeRole("ADMIN"), publishTest);
router.patch("/unpublish/:id",authorizeRole("ADMIN"), unPublishTest);
router.post("/:id/question",authorizeRole("ADMIN"), addQuestionToTest);
router.delete("/:testId/questions/:questionId",authorizeRole("ADMIN"), removeQuestionFromTest);
router.get("/:id/with-questions", getTestWithQuestion);
export default router