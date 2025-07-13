import { Test } from "../models/test.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Question } from "../models/question.model.js"
const createTest=asyncHandler(async(req,res)=>{
   const {title,subject,topics,year,duration}=req.body
   if(!title||!subject||!topics||!year||!duration)
   {
    throw new ApiError(400,"All fields are required")
   }
   const test=await Test.create({
    title,
    subject,
    topics,
    year,
    duration,
   })
   if(!test)
   {
     throw new ApiError(401,"Something went wrong while creating test")
   }
   return res
   .status(200)
   .json(new ApiResponse(200,test,"Test successfully created"))
})
const getAllTest=asyncHandler(async(req,res)=>{
    const test=await Test.find().select("title subject duration")
    if(!test)
    {
        throw new ApiError(409,"Something error occured happened while fetching all test")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,test,"All Test fetched successfully"))
})
const updateTest=asyncHandler(async(req,res)=>{
    const testId=req.params.id
    if(!testId)
    {
        throw new ApiError(409,"Test Id is undefined or null or empty")
    }
    const test=await Test.findById(testId)
    if(!test)
    {
        throw new ApiError("404","Test Not Found")
    }
    const {title,subject,topics,duration,year}=req.body
    if(title!==undefined)
    test.title=title
    if(subject!==undefined)
    test.subject=subject
    if(topics!==undefined)
    test.topics=topics
    if(duration!==undefined)
    test.duration=duration
    if(year!==undefined)
    test.year=year
    await test.save()
    return res
    .status(200)
    .json(new ApiResponse(200,test,"Test successfully updated"))
})
const publishTest=asyncHandler(async(req,res)=>{
    const testId=req.params.id
    if(!testId)
    {
        throw new ApiError(409,"TestId is undefined")
    }
    const test=await Test.findById(testId)
    if(!test)
    {
        throw new ApiError(404,"Test not found")
    }
    test.isPublished=true
    await test.save()
    return res
    .status(200)
    .json(new ApiResponse(200,test,"Test Published Successfully"))
})
const deleteTest=asyncHandler(async(req,res)=>{
    const testId=req.params.id
    if(!testId)
    {
        throw new ApiError(409,"Test Id is undefined")
    }
    const deletedTest=await Test.findByIdAndDelete(testId)
    if(!deletedTest)
    {
        throw new ApiError(404,"Test not found or already deleted")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Test Successfully Deleted"))
})
const getPublishedTest=asyncHandler(async(req,res)=>{
    const allPublishedTest=await Test.find({isPublished:true})
    if(allPublishedTest.length===0)
    {
        throw new ApiError(404,"No Published Test Found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,allPublishedTest,"All Published Test Successfully Test"))
})
const getTestById=asyncHandler(async(req,res)=>{
    const testId=req.params.id
    if(!testId)
    {
        throw new ApiError(409,"The testId is undefined")
    }
    const test=await Test.findById(testId).populate("questions")//Start from here in next round
    if(!test)
    {
        throw new ApiError(404,"Test Not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,test,"Test Successfully registered"))
})
const addQuestionToTest=asyncHandler(async(req,res)=>{
    if(!req)
    {
        throw new ApiError(409,"Req is undefined")
    }
    const testId=req.params.id
    const {statement,options,correctAnswerIndex,explanation}=req.body
    if(!testId)
    {
        throw new ApiError(409,"TestID is undefined or empty")
    }
    if(!statement||!options||!correctAnswerIndex)
    {
        throw new ApiError(409,"Statement, Options, Correct Answer are required")
    }
    if(!explanation)
    {
        req.body.explanation="No Explanation Available"
    }
    const question=await Question.create({
    statement:statement,
    options:options,
    correctAnswerIndex:correctAnswerIndex,
    explantion:explanation
    }
    )
    const test=await Test.findById(testId)
    if(!test)
    {
        throw new ApiError(404,"Test with testId not foound")
    }
    if (!Array.isArray(test.questions)) 
    {
      test.questions = [];
    }
    await test.questions.push(question._id)
    await test.save()
    return res
    .status(200)
    .json(new ApiResponse(200,question,"Question Successfully added to test"))
})
const unPublishTest=asyncHandler(async(req,res)=>{
    const testId=req.params.id
    if(!testId)
    {
        throw new ApiError(409,"Test Id is empty")
    }
    const test=await Test.findById(testId)
    if(!test)
    {
        throw new ApiError(404,"Test Not Found")
    }
    test.isPublished=false;
    await test.save()
    return res
    .status(200)
    .json(new ApiResponse(200,test,"Test Successfully Unpublished"))
})
const removeQuestionFromTest=asyncHandler(async(req,res)=>{
    const {testId,questionId}=req.params
    
    if(!testId||!questionId)
    {
        throw new ApiError(409,"Both testId and question Id are required")
    }
    const test=await Test.findById(testId)
    if(!test)
    {
        throw new ApiError(404,"Either test or question not found")
    }
    test.questions=test.questions.filter(
        (qid)=>qid.toString()!==questionId
    );
    await test.save()
    return res
    .status(200)
    .json(new ApiResponse(200,test,"Question successfully removed"))
})
const getTestWithQuestion=asyncHandler(async(req,res)=>{
    const testId=req.params.id
    if(!testId)
    {
        throw new ApiError(409,"Test ID is empty")
    }
    const test=await Test.findById(testId).populate("questions")
    if(!test)
    {
        throw new ApiError(404,"Test Not Found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,test,"Questions of Test Successfully Got"))
})
export{
    createTest,
    getAllTest,
    updateTest,
    publishTest,
    deleteTest,
    getPublishedTest,
    getTestById,
    addQuestionToTest,
    unPublishTest,
    removeQuestionFromTest,
    getTestWithQuestion
}