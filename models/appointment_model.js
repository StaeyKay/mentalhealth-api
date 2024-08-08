import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const appointmentSchema = new Schema ({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    professional: { type: Types.ObjectId, ref: 'User', required: true },
    date: {type: Date, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    notes: { type: String },
    status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' }
}, {
    timestamps: true
});

appointmentSchema.plugin(toJSON);

export const AppointmentModel = model('Appointment', appointmentSchema);