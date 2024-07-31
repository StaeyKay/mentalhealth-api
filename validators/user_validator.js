import Joi from "joi";

export const userValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string(),
    phoneNumber: Joi.string(),
    location: Joi.string(),
    termsAndConditions: Joi.boolean(),
})

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})