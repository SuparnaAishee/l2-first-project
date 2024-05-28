import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
 
  StudentModel,
  TUserName,
} from './student.interface';



const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'FirstName is required'],
    trim: true,
    maxlength: [20, 'FirstName can not be more than 20 characters'],
    validate: {
      validator: function (value:string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      
      },
      message:'{VALUE} is not in capitalize format'
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required'],
    trim: true,
    validate:{
      validator:(value:string)=>validator.isAlpha(value),
      message:'{VALUE} is not valid'
    }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father ContactNo is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother ContactNo is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'LocalGarduian Name is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'LocalGaurdian Occupation is required'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'LocalGaurdian ContactNo is required'],
  },
  address: {
    type: String,
    required: [true, 'LocalGaurdian Address is required'],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
user:{
  type:Schema.Types.ObjectId,
  required:[true,'User ID is required'],
  unique:true,
  ref:'User',
},


  name: {
    type: userNameSchema,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} IS NOT VALID',
    },
    required: [true, 'Have to fill gender option'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  
  },
  contactNo: { type: String, required: [true, 'ContactNo is required'] },

  emergencyContactNo: {
    type: String,
    required: [true, 'EmergencyContactNo is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'O+', 'AB+', 'AB-', 'B+', 'B-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isDeleted:{
    type:Boolean,
  
  default:false}
});


//query middleware

studentSchema.pre('find',function(next){
  console.log(this);
})




//creating a custom static methood
studentSchema.statics.isUserExits = async function(id:string){
  const exitsingUser = await Student.findOne({id});

  return exitsingUser;

}





//creating model
export const Student = model<TStudent,StudentModel>('Student', studentSchema);

