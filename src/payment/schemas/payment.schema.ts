import { Schema } from 'mongoose';

export const paymentSchemas = new Schema({
  botId: { type: Schema.Types.ObjectId, ref: 'Payment' },
  reference: {
    type: String,

  },
  message: {
    type: String,

  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
  },
  amount: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

