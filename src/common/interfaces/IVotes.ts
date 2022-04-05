import { Document } from 'mongoose';

export interface IVotes extends Document {
  fromUsername: string;
  toUsername: string;
  vote: number;
  is_deleted: boolean;
  updatedAt: Date;
}
