import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required.'],
	},
	email: {
		type: String,
		required: [true, 'Email is required.'],
		unique: true,
		match: [/.+\@.+\..+/, 'Please enter a valid email address.'],
	},
	password: {
		type: String,
		required: [true, 'Password is required.'],
	},
	phone: {
		type: String,
	},
	role: {
		type: String,
		enum: ['patient', 'admin'],
		default: 'patient',
	},
	// Fields specific to patients
	gender: {
		type: String,
		enum: ['Male', 'Female', 'Other'],
	},
	address: {
		type: String,
	},
	birthDate: {
		type: Date,
	},
	// You can add more patient-specific fields here
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema); 