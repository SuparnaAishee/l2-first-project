import { Schema, model } from "mongoose";
import { TUser } from "./user.iterface";
import config from "../../../config";
import bcrypt from 'bcrypt';


const userSchema = new Schema<TUser>({
id:{
    type:String,
    required:true,

},
password:{
    type:String,
    required:true,
},
needsPasswordChange:{
    type:Boolean,
    default:true,
},
role:{
    type:String,
    enum:['student','faculty','admin']
},
status:{
    type:String,
    enum:['in-progress','blocked'],
    default:'in-progress',

},
isDeleted:{
    type:Boolean,
    default:false,
}
},
{
    timestamps:true,
},

);

//pre save middleware/hook:will work on create() or save()
userSchema.pre('save',async function(next){
 

  //hashing password and save into db
  const user = this;//here this refer document
  user.password= await bcrypt.hash(this.password,Number(config.bcrypt_salt_rounds));
next();
});
//post save middleware/hook
userSchema.post('save',function(doc,next){

doc.password=''

  // console.log('post hook:we  saved our the data');

  next()
});

export const User = model<TUser>('User',userSchema)