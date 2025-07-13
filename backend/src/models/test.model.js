import mongoose from "mongoose"
const testSchema=new mongoose.Schema({
    title:{ 
       type:String,
       required:true
    },
    subject:{
        type:String,
        enum:["Maths","Physics","Chemistry"],
        required:true,
    },
    topics:{
        type:[String],
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    duration:{
        type:Number,
        required:true
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    }]
},
{
    timestamps:true,
})
export const Test=mongoose.model("Test",testSchema)