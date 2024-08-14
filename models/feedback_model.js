import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const feedbackSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    resource: { type: Types.ObjectId, ref: 'Resource' },
    supportGroup: { type: Types.ObjectId, ref: 'SupportGroup' },
    rating: { type: Number, min:1, max:5, required: true },
    comment: { type: String }
}, {
    timestamps: true
});

feedbackSchema.plugin(toJSON);

export const FeedbackModel = model('Feedback', feedbackSchema);