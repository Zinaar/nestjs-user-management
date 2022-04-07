import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String },
    role: {
      type: String,
      default: 'basic',
      enum: ['basic', 'admin'],
    },
    avatar: String,
    is_deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
