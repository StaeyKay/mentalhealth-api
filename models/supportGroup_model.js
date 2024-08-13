import {model, Schema, Types} from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const supportGroupSchema = new Schema ({
    name: { type: String, required: true },
    description: { type: String, required: true },
    schedule: [{ type: String, required: true }],
    facilitator: { type: Types.ObjectId, ref: 'User', required: true },
    facilitatorName: { type: String },
    members: [{ type: Types.ObjectId, ref: 'User' }],
    capacity: {type: Number, default: 20}
}, {
    timestamps: true
});

supportGroupSchema.plugin(toJSON);

export const SupportGroupModel = model('SupportGroup', supportGroupSchema);