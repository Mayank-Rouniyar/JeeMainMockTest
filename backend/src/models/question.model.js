import mongoose from "mongoose"
const questionSchema=new mongoose.Schema({
    statement:{
        type:String,
        required:true,
    },
    options:{
        type:[String],
        validate:{
            validator:(val)=>val.length===4,
            message:"Exactly 4 options are required"
        },
        required:true,
    },
    correctAnswerIndex:{
        type:Number,
        required:true,
    },
    explanation:{
        type:String,
    }
},{
    timestamps:true,
})
export const Question=mongoose.model("Question",questionSchema)