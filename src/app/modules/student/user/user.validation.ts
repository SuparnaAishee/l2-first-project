import { z } from "zod";


const userValidationSchema = z.object({
    id:z.string(),
    password:z.string({
        invalid_type_error:'password  must be string'
}).max(20,{message:'password cannot be more than 20 characters'}).optional(),
    needsPasswordChange:z.boolean().optional().default(true),
    role:z.enum(['student','faculty','admin']),
    
  

});

export const UserValidation = {
    userValidationSchema,
}
