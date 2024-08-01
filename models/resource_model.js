import {model, Schema, Types} from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const resourceSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['article', 'video', 'webinar', 'tool'], required: true },
    createdBy: {type: Types.ObjectId, required: true, ref: 'User'}
}, {
    timestamps: true
});

resourceSchema.plugin(toJSON);

export const ResourceModel = model('Resource', resourceSchema);