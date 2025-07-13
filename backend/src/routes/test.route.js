import {Router} from "express"
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
router.post("/", createTest);
router.get("/", getAllTest);
router.get("/published", getPublishedTest);
router.get("/:id", getTestById);
router.patch("/:id", updateTest);
router.delete("/:id", deleteTest);
router.patch("/publish/:id", publishTest);
router.patch("/unpublish/:id", unPublishTest);
router.post("/:id/question", addQuestionToTest);
router.delete("/:testId/questions/:questionId", removeQuestionFromTest);
router.get("/:id/with-questions", getTestWithQuestion);
export default router