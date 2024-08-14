import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { bookAppointment, cancelAppointment, getAppointmentHistory, getProfessionalAppointments, getUserAppointments, updateAppointment } from "../controllers/appointment_controller.js";

export const appointmentRouter = Router();

appointmentRouter.post('/users/appointment/:professionalId', checkAuth, bookAppointment);
appointmentRouter.get('/users/appointment/user', checkAuth, getUserAppointments);
appointmentRouter.get('/users/appointment/professional', checkAuth, getProfessionalAppointments);
appointmentRouter.patch('/users/appointment/:id', checkAuth, updateAppointment)
appointmentRouter.delete('/users/appointment/:id', checkAuth, cancelAppointment);
appointmentRouter.get('/users/appointment/history', checkAuth, getAppointmentHistory);