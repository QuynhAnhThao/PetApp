const mongoose = require("mongoose");
const AppointmentModel = require("../models/Appointment");
const AppointmentEntity = require("../domain/AppointmentEntity");

class AppointmentService {
  // Create appointment
  async createAppointment(app) {
    const entityApp = new AppointmentEntity(app);
    const createdApp = await AppointmentModel.create(entityApp.toObject());
    return createdApp.toObject();
  }

  // Get appointments
  async getAppointments() {
    const apps = await AppointmentModel.find({}).lean();
    if (!apps.length) throw new Error('No appointment exist. Please add new appointment.');
    // retrieve appoinments from db
    return apps;
  }

  // Update appointment
  async updateAppointment(id, newApp = {}) {
    const existApp = await AppointmentModel.findById(id).lean();
    if (!existApp) throw new Error('Appointment not found');

    // merge existInfo + newInfo
    const merged = {
      ...existApp,
      ...newApp,
      _id: existApp._id, // unchange id
    };

    // create PetEntity to validate merged data
    const entityApp = new AppointmentEntity(merged);

    // update pet in DB
    const updatedApp = await AppointmentModel.findByIdAndUpdate(
      id,
      entityApp.toObject(),
      { new: true, runValidators: true, overwrite: true }
    ).lean();
    return updatedApp;
    // const doc = await AppointmentModel.findById(id);
    // if (!doc) throw new Error("Appointment not found");

    // const current = AppointmentEntity.fromPersistence(doc);

    // const merged = {
    //   ...current.toObject(),
    //   ...(patch.userId !== undefined ? { userId: String(patch.userId) } : {}),
    //   ...(patch.petId !== undefined ? { petId: String(patch.petId) } : {}),
    //   ...(patch.date !== undefined ? { date: new Date(patch.date) } : {}),
    //   ...(patch.description !== undefined ? { description: String(patch.description) } : {}),
    //   _id: current._id
    // };

    // const next = new AppointmentEntity(merged);

    // // giữ kiểu trả về giống trước đây (updateOne result)
    // return await AppointmentModel.updateOne({ _id: id }, { $set: next.toObject() });

    // Nếu muốn trả document sau cập nhật:
    // const updated = await AppointmentModel.findByIdAndUpdate(id, next.toObject(), { new: true });
    // return updated.toObject();
  }

  // DELETE
  async deleteAppointment(id) {
    const deleteApp = await AppointmentModel.findByIdAndDelete(id);
    if (!deleteApp) throw new Error("Appointment not found");
    return { message: "Appointment deleted" };
  }
}

module.exports = new AppointmentService();
