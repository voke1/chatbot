


import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const ClientSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  phone: Number,
  role: String,
  password: String,
  isAdmin: Boolean,
})

export const clientsSchemas = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Companies' },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  fullName: {
    type: String,
    min: 5,
    max: 50,
  },
  email: {
    type: String,
    min: 5,
    max: 100,
  },
  phone: {
    type: String,
    min: 9,
    max: 15,
  },
  role: {
    type: String,
    min: 5,
    max: 20,
  },
  paymentPlan: {
    type: String,
  },
  password: {
    type: String,
    min: 8,
    max: 20,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isCreated: {
    type: Boolean,
    default: false,
  },
  isEnabled: { type: Boolean, default: true }, 
  isChecked: { type: Boolean, default: false },

});
