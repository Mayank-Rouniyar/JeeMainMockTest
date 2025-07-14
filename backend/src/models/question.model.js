import mongoose from "mongoose"
const questionSchema=new mongoose.Schema({
    statement:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        enum:["MCQ","Numerical"],
        required:true,
    },
    options:{
        type:[String],
        validate:{
            validator: function(val){
            if (this.type === "MCQ") {
             return Array.isArray(val) && val.length === 4;
          }
            return true;
         },
            message:"Exactly 4 options are required"
        },
        required:function(){
            if(this.type==="MCQ")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    },
    correctAnswerIndex:{
        type:Number,
        required:function(){
            if(this.type==="MCQ")
            {
                return true;
            }
            else
            {
                return false
            }
        }
    },
    correctAnswer:{
        type:Number,
        required:function(){
            if(this.type==="Numerical")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    },
    explanation:{
        type:String,
    }
},{
    timestamps:true,
})
export const Question=mongoose.model("Question",questionSchema)