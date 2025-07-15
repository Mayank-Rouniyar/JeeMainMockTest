import {Router} from "express"
import { submitTest,getSubmissionById,getUserSubmissions } from "../controllers/submission.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router=Router()
router.use(verifyJWT)
router.post("/:testId",submitTest)
router.get("/user/submission",getUserSubmissions)
router.get("/:submissionId",getSubmissionById)
export default router