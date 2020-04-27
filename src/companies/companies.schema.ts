import { Schema } from 'mongoose';

export const CompaniesSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  company_name: {
    type: String,
    max: 50,
  },
  domain_name: {
    type: String,
    max: 100,
  },
  phone: {
    type: String,
    min: 9,
    max: 20,
  },
  company_address: {
    type: String,
    max: 255,
  },
  
  created_at: {
    type: Date,
    default: Date.now,
  },
  // isAdmin: {
  //     type: Boolean,
  //     default: false,
  // },
  // isEnabled: { type: Boolean, default: false },
});
