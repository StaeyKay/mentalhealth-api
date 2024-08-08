import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { bookAppointment, cancelAppointment, getAppointmentHistory, getProfessionalAppointments, getUserAppointments, updateAppointment } from "../controllers/appointment_controller.js";

export const appointmentRouter = Router();

appointmentRouter.post('/appointment', checkAuth, bookAppointment);
appointmentRouter.get('/appointment/user', checkAuth, getUserAppointments);
appointmentRouter.get('/appointment/professional', checkAuth, getProfessionalAppointments);
appointmentRouter.patch('/appointment/:id', checkAuth, updateAppointment)
appointmentRouter.delete('/appointment/:id', checkAuth, cancelAppointment);
appointmentRouter.get('/appointment/history', checkAuth, getAppointmentHistory);