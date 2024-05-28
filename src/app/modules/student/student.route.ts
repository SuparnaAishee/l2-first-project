import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

//will call contoller function


router.get('/', StudentControllers.getAllStudents);
router.get('/', StudentControllers.getSingleStudent);
router.delete('/', StudentControllers.deleteStudent);




export const StudentRoutes = router;
