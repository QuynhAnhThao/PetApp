// // controllers/appointment.controller.js
const appointmentService = require("../services/appointmentService");

// POST /api/appointments
exports.createAppointment = async (req, res) => {
  try {
    const data = await appointmentService.createAppointment(req.body);
    res.status(201).json(data);
  } catch (error) {
    const code = /required|invalid/i.test(error.message) ? 400 : 500;
    res.status(code).json({ message: error.message });
  }
};

// GET /api/appointments?userId=&petId=&from=&to=&limit=&skip=
exports.getAppointments = async (req, res) => {
  try {
    const data = await appointmentService.getAppointments(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH/PUT /api/appointments/:id
exports.updateAppointment = async (req, res) => {
  try {
    const data = await appointmentService.updateAppointment(req.params.id, req.body);
    res.json(data); // updateOne result
  } catch (error) {
    const code = /invalid objectid/i.test(error.message) ? 400
              : /not found/i.test(error.message) ? 404 : 500;
    res.status(code).json({ message: error.message });
  }
};

// DELETE /api/appointments/:id
exports.deleteAppointment = async (req, res) => {
  try {
    const data = await appointmentService.deleteAppointment(req.params.id);
    res.json(data);
  } catch (error) {
    const code = /invalid objectid/i.test(error.message) ? 400
              : /not found/i.test(error.message) ? 404 : 500;
    res.status(code).json({ message: error.message });
  }
};
