const Appointment = require('../models/Appointment');

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    // find appointment for linked user in db
    const appointments = await Appointment.find({ userId: req.user.id }); 

    // send the retrieved appointments back to the user
    res.json(appointments); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new appointment
const addAppointment = async (req, res) => {
  const { petName, ownerName, ownerPhone, date, description } = req.body;
  try {
    if (!petName || !ownerName || !ownerPhone || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const time = new Date(date).getTime();
    if (Number.isNaN(time)) {
      return res.status(400).json({ message: 'Invalid date/time' });
    };
    // create new appointment record in db
    const appointment = await Appointment.create({
      userId: req.user.id,
      petName,
      ownerName,
      ownerPhone,
      date: new Date(date), // store as Date (datetime)
      description
    });

    // send the newly created appointment back to the user
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update existing appointment
const updateAppointment = async (req, res) => {
  const { petName, ownerName, ownerPhone, date, description } = req.body;
  try {
    // search for the appointment in the database by ID
    const appointment = await Appointment.findById(req.params.id);

    // if not found, show message
    if (!appointment)
      return res.status(404).json({ message: 'Appointment not found' });

    // if found, update appointment fields only if new values are provided
    appointment.petName = petName || appointment.petName;
    appointment.ownerName = ownerName || appointment.ownerName;
    appointment.ownerPhone = ownerPhone || appointment.ownerPhone;
    if (date) {
      const ts = new Date(date).getTime();
      if (Number.isNaN(ts)) {
        return res.status(400).json({ message: 'Invalid date/time' });
      }
      appointment.date = new Date(date);
    };
    appointment.description = description || appointment.description;

    // save the updated appointment in the database
    const updatedAppointment = await appointment.save();

    // send the updated appointment back to the user
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    // search for the appointment in the database by ID
    const appointment = await Appointment.findById(req.params.id);

    // if not found, show error
    if (!appointment)
      return res.status(404).json({ message: 'Appointment not found' });

    // if found, remove appointment from db
    await appointment.remove();

    // send confirmation back to the user
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
