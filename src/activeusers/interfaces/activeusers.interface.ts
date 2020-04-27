import { Document } from 'mongoose';
export interface Activeusers extends Document {
  id?: string;
  company_id: string;
  setting_id: string;
}
