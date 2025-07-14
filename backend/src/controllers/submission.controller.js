import { Submission } from "../models/submission.model.js";
import { User } from "../models/user.model.js";
import { Test } from "../models/test.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const submitTest=asyncHandler(async(req,res)=>{
const {testId}=req.params
const {answers}=req.body
const userId=req.user._id
if(!testId||!answers||!Array.isArray(answers))
{
    throw new ApiError(409,"Test ID and Answer array both are required")
}
const test=await Test.findById(testId).populate("questions")
if(!test)
{
    throw new ApiError(404,"Test Not Found")
}
//Now we have to send null in frontend if the user doesnot attempt that questions
if(answers.length!==test.questions.length)
{
    throw new ApiError(401,"Answer array length must be equal")
}
let score=0;
for(let i=0;i<=answers.length-1;i++)
{
   const question = test.questions[i];
  const userAnswer = answers[i];

  if (userAnswer === null || userAnswer === undefined) continue;

  if (question.type === "MCQ") {
    if (userAnswer === question.correctAnswerIndex) {
      score += 4;
    } else {
      score -= 1;
    }
  } else if (question.type === "Numerical") {
    if (userAnswer === question.correctAnswer) {
      score += 4;
    } else {
      score -= 1;
    }
  }
}
   const submission=await Submission.create({
    user:userId,
    test:testId,
    score,
    answers,
   })
   return res
   .status(200)
   .json(new ApiResponse(200,submission,"Test Successfully submitted"))
})
export{
    submitTest
}