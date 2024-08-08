import { AppointmentModel } from "../models/appointment_model.js";
import { appointmentValidator } from "../validators/user_validator.js"


// Book an appointment
export const bookAppointment = async (req, res) => {
    try {
        const { value, error } = appointmentValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message })
        }

        // Check if professional is available
        const { professional, startTime, endTime } = value;

        const overlappingAppointment = await AppointmentModel.findOne({
            professional,
            startTime: { $lt: endTime },
            endTime: { $gt: startTime },
            status: 'scheduled'
        });

        if (overlappingAppointment) {
            return res.status(400).json({ messagae: 'This therapist is already booked for this time period.' })
        }

        const appointment = await AppointmentModel.create(value)
        res.status(201).json({
            message: 'You have successfully booked an appointment',
            appointment: appointment
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error' })
    }
}

// View all appointments for a professional
export const getProfessionalAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentModel
            .find({ professional: req.user.id, status: 'scheduled'})
            .populate('user')
        
        res.status(200).json(appointments)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: 'Server error'});
    }
}

// View all appointments for a user
export const getUserAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find({user: req.user.id}).populate('professional');
        res.status(200).json(appointments);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({error: 'Server error'}) 
    }
}

// Update an appointment
export const updateAppointment = async (req, res) => {
    try {
        const {value, error} = appointmentValidator.validate(req.body);
        if (error) {
            return res.status(400).json({error: error.message})
        }
    
        const appointment = await AppointmentModel.findByIdAndUpdate(req.params.id, value, {new: true});
        res.status(200).json({message: 'Your appointment has been successfully updated'})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: 'Server error'})
    }
}

// Cancel an appointment
export const cancelAppointment = async () => {
    try {
        const appointment = await AppointmentModel.findByIdAndUpdate(req.params.id, {status: 'canceled'}, {new: true});
        res.status(200).json({message: 'Your appointment has been cancelled successfully'})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: 'Server error'});
    }
};

// Retrieve appointment history
export const getAppointmentHistory = async (req, res) => {
    try {
        const history = await AppointmentModel.find({user: req.user.id, status: ['completed', 'canceled']}).populate('professional');
        res.status(200).json(history);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Server error'})
    }
}