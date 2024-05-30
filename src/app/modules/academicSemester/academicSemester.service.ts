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


export const AcademicSemesterServices={
    createAcademicSemesterIntoDB,
}