import Joi from "joi";

//creating a joi schema validation
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .message('{#label} must be capitalized')
    .required()
    .messages({
      'string.empty': 'FirstName is required',
      'string.max': 'FirstName can not be more than 20 characters',
    }),
  middleName: Joi.string().trim().allow(null, ''),
  lastName: Joi.string()
    .trim()
    .regex(/^[A-Za-z]*$/)
    .required()
    .messages({
      'string.empty': 'LastName is required',
      'string.pattern.base': '{#label} is not valid',
    }),
});

// Guardian validation schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': 'Father ContactNo is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.empty': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': 'Mother ContactNo is required',
  }),
});

// LocalGuardian validation schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'LocalGuardian Name is required',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': 'LocalGuardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'LocalGuardian ContactNo is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'LocalGuardian Address is required',
  }),
});

// Student validation schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'object.base': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{#value} is not valid',
    'string.empty': 'Have to fill gender option',
  }),
  dateOfBirth: Joi.string().allow(null, ''),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not a valid email',
    'string.empty': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'ContactNo is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'EmergencyContactNo is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'O+', 'AB+', 'AB-', 'B+', 'B-')
    .messages({
      'any.only': '{#value} is not valid',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present Address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'LocalGuardian is required',
  }),
  profileImg: Joi.string().allow(null, ''),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

//ending
export default studentValidationSchema;