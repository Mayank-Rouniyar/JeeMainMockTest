import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()
const allowedOrigin=[
    "http://localhost:5173",
    "https://jee-main-mock-test.vercel.app"
]
app.use(cors({
        origin:allowedOrigin,
        credentials:true,
    }))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
import userRouter from './routes/user.route.js'
app.use("/api/v1/users",userRouter)
import testRouter from './routes/test.route.js'
app.use("/api/v1/tests",testRouter)
import submissionRouter from './routes/submission.route.js'
app.use("/api/v1/submissions",submissionRouter)
export {app}