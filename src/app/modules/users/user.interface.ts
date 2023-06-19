import mongoose, { Schema } from "mongoose";

export interface IUser {
  
    name: string;
    department: string;
    Supply: string;
    phone: string;
    description: string;
    imageLink: string;
  }

 