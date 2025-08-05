import { ApiError } from "../utils/ApiError.js";

export const authorizeRole=(...roles)=>{
    return (req,res,next)=>
    {
   const hisRole=req.user.role
   let b=false;
   for(let i=0;i<=roles.length-1;i++)
   {
     if(hisRole===roles[i])
     {
        b=true;
     }
   }
   if(!b)
   {
    throw new ApiError(402,"You are not authorized to go ahead")
   }
   next()
};
};