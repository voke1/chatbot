import { Schema } from 'mongoose';

export const templateSchema = new Schema({
  company_id: { type: Schema.Types.ObjectId, ref: 'User' },
  clientId: {type: Schema.Types.ObjectId, ref: "Client"},
  setting_id: { type: Schema.Types.ObjectId, ref: 'Setting' },
  templateName: {
    type: String,
    required: true
  },
  template: {
    type: Object,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});
