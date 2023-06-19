import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

const userSchema = new Schema({
  // _id: {
  //   type: String,
  //   required: true
  // },
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,    
      required: true,
    },
      
    supply: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    description: {
      type: Number,
      required: true,
    },
    imageLink: {
      type: Number,
      required: true,
    },
   
  });



export const UserModel = model<IUser>(
  'User',
  userSchema
);
