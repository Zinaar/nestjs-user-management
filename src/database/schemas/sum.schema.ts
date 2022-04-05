import { Schema } from 'mongoose';

export const SumSchema = new Schema(
  {
    username: String,
    sum: {
      type: Number,
      default: 0,
    },
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
