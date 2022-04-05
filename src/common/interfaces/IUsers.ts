import { Document } from 'mongoose';
export interface IUsers extends Document {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
  updatedAt: string;
  avatar: string;
}
