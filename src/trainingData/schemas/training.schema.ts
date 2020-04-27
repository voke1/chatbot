import { Schema } from 'mongoose';

export const TrainingSchema = new Schema({
  company_id: { type: Schema.Types.ObjectId, ref: 'User' },
  clientId: {type: Schema.Types.ObjectId, ref: "Client"},
  setting_id: { type: Schema.Types.ObjectId, ref: 'Setting' },
  botId: { type: String, ref: 'Tree' },

  training: {
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
