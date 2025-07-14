import mongoose from "mongoose";
const submissionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    test:{
        type:mongoose.Types.ObjectId,
        ref:"Test",
        required:true,
    },
    answers:{
        type:[Number],
        required:true,
    },
    score:{
        type:Number,
        required:true
    },
    submittedAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})
export const Submission=mongoose.model("Submission",submissionSchema)