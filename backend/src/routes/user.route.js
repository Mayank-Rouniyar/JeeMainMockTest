import {Router} from "express"
import 
   { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    getAllUser 
   } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",verifyJWT,logoutUser)
router.get("/me",verifyJWT,getCurrentUser)
router.post("/refreshAccessToken",refreshAccessToken)
router.get("/allUser",getAllUser)
export default router