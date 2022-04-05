import { Schema } from 'mongoose';

export const VoteSchema = new Schema(
  {
    fromUsername: String,
    toUsername: { type: String, required: true },
    vote: Number,
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
