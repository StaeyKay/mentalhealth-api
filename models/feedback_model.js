import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const feedbackSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    resourceId: { type: Types.ObjectId, ref: 'Resource' },
    supportGroupId: { type: Types.ObjectId, ref: 'SupportGroup' },
    rating: { type: Number, required: true },
    comment: { type: String }
}, {
    timestamps: true
});

feedbackSchema.plugin(toJSON);

export const FeedbackModel = model('Feedback', feedbackSchema);