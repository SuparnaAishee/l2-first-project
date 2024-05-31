import config from '../../../config';
import { TAcademicSemester } from '../../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../../academicSemester/academicSemester.model';
import { TStudent } from '../student.interface';
import { Student } from '../student.model';
import {  TUser } from './user.iterface';
import {User} from './user.model';
import { generateStudentId } from './user.utils';


const createStudentIntoDB = async (password:string,payload: TStudent) => {
  //create a user object
  const userData:Partial<TUser> = {};

 

  //if password is not given,use default password

  userData.password = password || (config.default_password as string);
  
  //set student role
 userData.role = 'student';



//find academic semester info
const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);


// generated id
if (admissionSemester) {
  // set generated id
  userData.id = await generateStudentId(admissionSemester);
} else {
  // Handle the case where admissionSemester is not found
  throw new Error('Admission semester not found');
}

 //create a user
const newUser = await User.create(userData); 

//create a student
if(Object.keys(newUser).length){
  //set id,_id as user
  payload.id = newUser.id;//embedding id
  payload.user =newUser._id;//reference _id

  const newStudent = await Student.create(payload);
  return newStudent;
}



};



export const UserServices = {
    createStudentIntoDB
}
