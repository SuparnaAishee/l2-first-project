import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";


//controll creating for create-student
const createStudent = catchAsync(async (req , res) => {
 


    //schema validation using joi
     const { password,student: studentData } = req.body;

    

    //will call service fun to send this data by post
    const result = await UserServices.createStudentIntoDB(password,studentData);

   
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'student is created successfully',
      data:result,
    });
  } 
);
export const UserControllers ={
  createStudent,
}