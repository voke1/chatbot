import { Document } from 'mongoose';
export interface Tree extends Document {
  id?: string;
  company_id: string;
  setting_id: string;
}
