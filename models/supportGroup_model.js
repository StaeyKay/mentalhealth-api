import {model, Schema, Types} from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const supportGroupSchema = new Schema ({
    name: { type: String, required: true },
    description: { type: String, required: true },
    meetingSchedule: { type: String, required: true },
    facilitatorId: { type: Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

supportGroupSchema.plugin(toJSON);

export const supportGroupModel = model('SupportGroup', supportGroupSchema);