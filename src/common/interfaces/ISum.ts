import { Document } from 'mongoose';

export interface ISum extends Document {
  username: string;
  sum: number;
  is_deleted: boolean;
}
