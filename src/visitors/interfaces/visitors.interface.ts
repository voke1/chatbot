import { Document } from 'mongoose';
export interface Visitors extends Document {
  id?: string;
  company_id: string;
  setting_id: string;
}
