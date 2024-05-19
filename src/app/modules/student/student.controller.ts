import { Request, Response } from 'express';
import { StudentServices } from './student.service';

import Joi from 'joi';
import studentValidationSchema from './student.validation';

//controll creating for create-student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //data validation using joi
    const { error,value } = studentValidationSchema.validate(studentData);

    //will call service fun to send this data by post
    const result = await StudentServices.createStudentIntoDB(value);

    //console.log({error},{value});

    if (error) {
      res.status(500).json({
        sucess: false,
        message: 'something went wrong',
        error: error.details,
      });
    }

    //send response
    res.status(200).json({
      sucess: true,
      message: 'student is created sucessfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: 'something went wrong',
     error:err,
    });
  }
};

//controll creating for getallstudents data by get

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      sucess: true,
      message: 'student are retrieved sucessfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// controll creating for singlestudent with id
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'student is retrieved sucessfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
