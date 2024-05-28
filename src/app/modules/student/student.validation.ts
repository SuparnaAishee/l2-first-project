import { z } from "zod";

// UserName validation schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'FirstName can not be more than 20 characters')
    .regex(/^[A-Z][a-z]*$/, '{VALUE} is not in capitalize format')
    .refine((value) => !!value, 'FirstName is required'),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z]*$/, '{VALUE} is not valid')
    .refine((value) => !!value, 'LastName is required'),
});

// Guardian validation schema
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .refine((value) => !!value, 'Father Name is required'),
  fatherOccupation: z
    .string()
    .trim()
    .refine((value) => !!value, 'Father Occupation is required'),
  fatherContactNo: z
    .string()
    .refine((value) => !!value, 'Father ContactNo is required'),
  motherName: z
    .string()
    .trim()
    .refine((value) => !!value, 'Mother Name is required'),
  motherOccupation: z
    .string()
    .trim()
    .refine((value) => !!value, 'Mother Occupation is required'),
  motherContactNo: z
    .string()
    .refine((value) => !!value, 'Mother ContactNo is required'),
});

// LocalGuardian validation schema
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .refine((value) => !!value, 'LocalGuardian Name is required'),
  occupation: z
    .string()
    .trim()
    .refine((value) => !!value, 'LocalGuardian Occupation is required'),
  contactNo: z
    .string()
    .refine((value) => !!value, 'LocalGuardian ContactNo is required'),
  address: z
    .string()
    .trim()
    .refine((value) => !!value, 'LocalGuardian Address is required'),
});

// Student validation schema
const studentValidationSchema = z.object({
  id: z.string().refine((value) => !!value, 'ID is required'),
  password: z.string().refine((value) => !!value, 'password is required'),
  name: userNameValidationSchema.refine((value) => !!value, 'Name is required'),
  gender: z
    .enum(['male', 'female', 'other'], {
      errorMap: () => ({ message: '{VALUE} is not valid' }),
    })
    .refine((value) => !!value, 'Have to fill gender option'),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email('{VALUE} is not a valid email')
    .refine((value) => !!value, 'Email is required'),
  contactNo: z.string().refine((value) => !!value, 'ContactNo is required'),
  emergencyContactNo: z
    .string()
    .refine((value) => !!value, 'EmergencyContactNo is required'),
  bloodGroup: z.enum(['A+', 'A-', 'O+', 'AB+', 'AB-', 'B+', 'B-']).optional(),
  presentAddress: z
    .string()
    .trim()
    .refine((value) => !!value, 'Present Address is required'),
  permanentAddress: z
    .string()
    .trim()
    .refine((value) => !!value, 'Permanent Address is required'),
  guardian: guardianValidationSchema.refine(
    (value) => !!value,
    'Guardian is required',
  ),
  localGuardian: localGuardianValidationSchema.refine(
    (value) => !!value,
    'LocalGuardian is required',
  ),
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;