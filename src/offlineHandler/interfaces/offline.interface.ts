import { Document } from 'mongoose';
export interface Offline extends Document {
  email: string,
  botName: string;
}
