import {model, Schema} from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const resourceSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
    type: { type: String, enum: ['article', 'video', 'webinar', 'tool'], required: true }
}, {
    timestamps: true
});

resourceSchema.plugin(toJSON);

export const ResourceModel = model('Resource', resourceSchema);