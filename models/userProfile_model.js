import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userProfileSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    bio: {type: String},
    profession: {type: String},
    profilePicture: {type: String}
}, {
    timestamps: true
})

userProfileSchema.plugin(toJSON)

export const UserProfileModel = model('UserProfile', userProfileSchema)