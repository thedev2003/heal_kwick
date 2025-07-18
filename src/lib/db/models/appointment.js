import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  primaryPhysician: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: [true, 'Reason for appointment is required.'],
  },
  schedule: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
    default: '',
  }
}, { timestamps: true });

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);