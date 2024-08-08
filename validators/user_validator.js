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

export const resourceValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string().required(),
    url: Joi.string()
})

export const supportGroupValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    schedule: Joi.string().required(),
    facilitator: Joi.string().required(),
    members: Joi.string(),
    capacity: Joi.number()
})

export const appointmentValidator = Joi.object({
    user: Joi.string().required(),
    professional: Joi.string().required(),
    date: Joi.date().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    status: Joi.string().valid('scheduled', 'completed', 'canceled').default('scheduled'),
    notes: Joi.string().optional(),
});