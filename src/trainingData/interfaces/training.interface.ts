import { Document } from 'mongoose';
export interface Training extends Document {
  id?: string;
  company_id: string;
  setting_id: string;
}
