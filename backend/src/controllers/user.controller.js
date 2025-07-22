import { User } from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
const generateAccessAndRefreshTokens=async(userId)=>{
   try{
      const user=await User.findById(userId)
      const accessToken=user.generateAccessTokens()
      const refreshToken=user.generateRefreshTokens()
      user.refreshToken=refreshToken
      await user.save({validateBeforeSave: false})
      return {accessToken,refreshToken}
   }
   catch(error){
     console.error("The error is",error)
     throw new ApiError(500,"Something Went Wrong while generating refresh and access token")
   }
}
const registerUser=asyncHandler(async(req,res)=>{
    if(!req.body)
    {
       throw new ApiError(400,"Body is required")
    }
    const{name,email,username,password}=req.body
    const {role}=req.body
    if(!name?.trim()||!email?.trim()||!username?.trim()||!password?.trim())
    {
       throw new ApiError(401,"All fields are required to register")
    }
    const existedUser=await User.findOne({
      $or:[{email},{username}]
    })
    if(existedUser)
    {
      throw new ApiError(409,"User Already existed can't register")
    }
    const user=await User.create({
     name:name,
     email:email,
     username:username,
     password:password,
     role:role||"USER"
    })
    const createdUser=await User.findById(user._id).select(
      "-password -refreshToken"
    )
    if(!createdUser)
    {
      throw new ApiError(500,"Something went wrong while creating the user")
    }
    return res
    .status(201)
    .json(new ApiResponse(200,createdUser,"User successfully registered"))
})
const loginUser=asyncHandler(async(req,res)=>{
 const {email,username,password}=req.body
  if(!password)
  {
    throw new ApiError(401,"Password field is must")
  }
  if(!email&&!username)
  {
    throw new ApiError(401,"Username or password is required")
  }
  const user=await User.findOne({
    $or:[{username},{email}]
  }).select("+password")
  if(!user)
  {
    throw new ApiError(404,"User not found")
  }
  const checkPassword=await user.isPasswordCorrect(password)
  if(!checkPassword)
  {
    throw new ApiError(401,"It's wrong password")
  }
  const accessToken=user.generateAccessTokens()
  const refreshToken=user.generateRefreshTokens()
  console.log("Refresh Token is",refreshToken)
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  
  const safeUser={
    _id:user._id,
    name:user.name,
    username:user.username,
    email:user.email,
    role:user.role
  }
  const options={
        httpOnly:true,
        secure:true,
        sameSite:"Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 
    }
  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(new ApiResponse(200,{safeUser,accessToken},"User logged in successfully"))
})
const logoutUser=asyncHandler(async(req,res)=>{
   const userId=req.user?._id
   if(!userId)
   {
    throw new ApiError(401,"The given user is undefined or null or empty")
   }
   await User.findByIdAndUpdate(userId,
    { $set:
      {
      refreshToken: undefined
      }
    },
      {
      new : true
      })
      const options={
      httpOnly:true,
      secure:true
      }
   return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(new ApiResponse(200,{},"User Successfully Logged Out"))
})
const refreshAccessToken=asyncHandler(async(req,res)=>{
   const incommingRefreshToken=req.cookies.refreshToken||req.body.refreshToken
   if(!incommingRefreshToken)
   {
    throw new ApiError(400,"Unauthorized User Incomming refresh token Empty")
   }
   //try {
    let decodedToken;
     decodedToken=jwt.verify(incommingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    if(!decodedToken)
    {
     throw new ApiError(401,"Unauthorized Token decoded token not found")
    }
    const user=await User.findById(decodedToken._id)
    if(!user)
    {
     throw new ApiError(401,"Unauthorized user")
    }
    console.log("Incomming refresh token is",incommingRefreshToken)
    console.log("user.refreshToken is",user.refreshToken)
    if(incommingRefreshToken!==user.refreshToken)
    {
     throw new ApiError(401,"Potentially refresh token expired")
    }
    const options={
    httpOnly:true,
    secure:true,
    sameSite: "Lax" 
    }
    const {accessToken,refreshToken:newRefreshToken}=await generateAccessAndRefreshTokens(user._id)
    user.refreshToken=newRefreshToken
    await user.save()
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(new ApiResponse(200,{accessToken,newRefreshToken},"New Access Token successfully generated"))
   //} catch (error) {
   // throw new ApiError(500,"Error occured while generating refresh token")
   //}
})
const getCurrentUser=asyncHandler(async(req,res)=>{
   if(!req.user)
   {
    throw new ApiError(400,"Invalid User")
   }
   return res
   .status(200)
   .json(new ApiResponse(200,req.user,"Logged in user fetched successfully"))
})
export{
    generateAccessAndRefreshTokens,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
}