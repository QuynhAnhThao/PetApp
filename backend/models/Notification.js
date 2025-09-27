const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    channel: { type: String, enum: ['email', 'sms'], required: true },
    status  : { type: String, enum: ['sent', 'pending', 'failed'], default: 'pending' }

});

module.exports = mongoose.model('Notification', notificationSchema);
