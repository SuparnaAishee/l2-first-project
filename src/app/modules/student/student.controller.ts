import { Request, Response } from 'express';
import { StudentServices } from './student.service';

//controll creating for create-student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //will call service fun to send this data by post
    const result = await StudentServices.createStudentIntoDB(studentData);

    //send response
    res.status(200).json({
      sucess: true,
      message: 'student is created sucessfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
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
