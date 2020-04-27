import * as mongoose from 'mongoose';

/**
 * The Schema is the Model or table as in other language frameworks
 */
export const TreeSchema = new mongoose.Schema({
    identity: String,
    prompt: String,
    response: Object,
});