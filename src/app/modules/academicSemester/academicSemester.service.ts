import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterNameCodeMapper } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { academicSemesterNameCodeMapper } from "./academicSemesterConstant";


const createAcademicSemesterIntoDB = async(payload:TAcademicSemester,)=>{

//semester name--> semester code




if(academicSemesterNameCodeMapper[payload.name]!==payload.code){
    throw new Error('Invalid Semester Code!')
}

    const result = await AcademicSemester.create(payload);
    return result;
};
//get all semester
 const getAllAcademicSemesterFromDB = async(payload:TAcademicSemester)=>{
const result = await AcademicSemester.find(payload);
return result;
 };

 //get single semester
 const getSingleAcademicSemesterFromDB = async (id: string) => {
   const result = await AcademicSemester.findById(id);
   return result;
 };

 //update smester by patch
 const updateAcademicSemesterIntoDB = async (
   id: string,
   payload: Partial<TAcademicSemester>,
 ) => {
   if (
     payload.name &&
     payload.code &&
     academicSemesterNameCodeMapper[payload.name] !== payload.code
   ) {
     throw new Error('Invalid Semester Code');
   }

   const result = await AcademicSemester.findOneAndUpdate(
     { _id: id },
     payload,
     {
       new: true,
     },
   );
   return result;
 };



export const AcademicSemesterServices={
    createAcademicSemesterIntoDB,getAllAcademicSemesterFromDB,getSingleAcademicSemesterFromDB,updateAcademicSemesterIntoDB
}