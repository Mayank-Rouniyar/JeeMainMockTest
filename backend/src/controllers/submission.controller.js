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
const getUserSubmissions=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    if(!userId)
    {
        throw new ApiError(409,"userID is required")
    }
    const submission=await Submission.find({user:userId}).populate("test","topics title subject year duration").sort({ submittedAt: -1 })
    if(submission.length===0)
    {
        throw new ApiError(404,"No Submitted Test found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,submission,"All Submiited test fetched successfully"))
})
const getSubmissionById=asyncHandler(async(req,res)=>{
    const {submissionId}=req.params
    if(!submissionId)
    {
        throw new ApiError(409,"Submission ID is required")
    }
    const submission=await Submission.findById(submissionId)
    .populate({
        path:"test",
        populate:({
            path:"questions"
        })
    })
    if(!submission)
    {
        throw new ApiError(404,"Submission Not Found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,submission,"Submission Successfully fetched"))
})
export{
    submitTest,
    getUserSubmissions,
    getSubmissionById
}