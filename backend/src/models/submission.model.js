import mongoose from "mongoose";
const submissionSchema=new mongoose.Schema({
    
},{timestamps:true})
export const Submission=mongoose.model("Submission",submissionSchema)