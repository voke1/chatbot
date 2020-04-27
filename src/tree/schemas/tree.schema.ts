import { Schema } from 'mongoose';

export const treeSchema = new Schema({
  
  setting_id: { type: Schema.Types.ObjectId, ref: 'Setting' },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },

  chat_body: {
    type: Array,
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
