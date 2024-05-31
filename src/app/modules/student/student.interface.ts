import { Mode } from "fs";
import { Models, Types } from "mongoose";
import { Model } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
// 1. Create an interface representing a document in MongoDB.
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password:string;
  name: TUserName;
  gender: 'male' | 'female'|'other';
  dateOfBirth?: Date;
  email: string;
  avatar?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'O+' | 'AB+' | 'AB-' | 'B+' | 'B-'|'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester:Types.ObjectId;
  isDeleted:boolean;
};
//for creating static
export interface StudentModel extends Model<TStudent>{
 isUserExits(id:string):Promise<TStudent | null>;
}











//for creating instance 

//  export type StudentMethods = {
//   isUserExits(id:string):Promise<TStudent| null>;
// };

//  export type StudentModel = Model<
// TStudent,
// Record<string,never>,
// StudentMethods
// >;


