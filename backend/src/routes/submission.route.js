import {Router} from "express"
import { submitTest } from "../controllers/submission.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router=Router()
router.use(verifyJWT)
router.post("/:testId",submitTest)
export default router