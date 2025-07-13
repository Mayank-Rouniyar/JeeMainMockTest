
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
dotenv.config({
  path: './.env'
});
import { app } from './app.js';
connectDB()
.then(()=>{
  app.on("error",(error)=>{
    console.log("We are facing Error:", error);
  })
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`App is listening at port :${process.env.PORT}`);
  })
})
.catch((err)=>{
  console.log("MONGO DB CONNECTION FAILED", err);
})




























/*import express from 'express';
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//app.use(cors({
//    origin: process.env.CORS_ORIGIN,
  //  credentials: true
//}))
app.get('/api/jokes', (req, res) => {
  const jokes=[
    {
        id:1,
        title: "Why did the chicken cross the road?",
        content: "To get to the other side!"
    },
    {
        id:2,
        title: "Why don't scientists trust atoms?",
        content: "Because they make up everything!"
    },
    {
        id:3,
        title: "What do you call fake spaghetti?",
        content: "An impasta!"
    },
    {
        id:4,
        title:"Why did the math book look sad?",
        content:"Because it had too many problems!"
    },
    {
        id:5,
        title:"Why did the scarecrow win an award?",
        content:"Because he was outstanding in his field!"
    }
  ]
  res.send(jokes)
});
const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})*/