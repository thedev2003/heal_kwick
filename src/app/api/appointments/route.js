import connectDB from '@/lib/db/connect';
import Appointment from '@/lib/db/models/appointment';
import User from '@/lib/db/models/user';
import { sendSms } from '@/lib/utils';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		await connectDB();
		const headersList = headers();
		const userId = headersList.get('x-user-id');
		const userRole = headersList.get('x-user-role');

		if (!userId) {
			return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
		}

		let query = {};
		if (userRole === 'admin') {
			// Admins see all appointments, with patient info populated
			query = {};
		} else {
			// Patients see only their own appointments
			query = { patient: userId };
		}

		const appointments = await Appointment.find(query)
			.populate('patient', 'name email') // Populate patient details
			.sort({ schedule: -1 })
			.lean();

		return NextResponse.json(JSON.parse(JSON.stringify(appointments)), { status: 200 });
	} catch (error) {
		console.error('Failed to fetch appointments:', error);
		return NextResponse.json({ message: 'An error occurred while fetching appointments.' }, { status: 500 });
	}
}

export async function POST(request) {
	// ... (The POST function from the previous step remains unchanged)
	try {
		await connectDB();
		const headersList = headers();
		const userId = headersList.get('x-user-id');

		if (!userId) {
			return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
		}

		const patient = await User.findById(userId);
		if (!patient) {
			return NextResponse.json({ message: 'Patient not found.' }, { status: 404 });
		}

		const { reason, primaryPhysician, schedule } = await request.json();

		if (!reason || !primaryPhysician || !schedule) {
			return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
		}

		const newAppointment = new Appointment({
			patient: userId,
			primaryPhysician,
			reason,
			schedule: new Date(schedule),
			status: 'pending',
		});

		await newAppointment.save();

		// Send SMS notification if phone number is available
		if (patient.phone) {
			const messageBody = `Hi ${patient.name}, your appointment for ${new Date(schedule).toLocaleDateString()} has been successfully requested. You will be notified once it's confirmed.`;
			await sendSms(patient.phone, messageBody);
		}

		return NextResponse.json(newAppointment, { status: 201 });
	} catch (error) {
		console.error('Failed to create appointment:', error);
		return NextResponse.json({ message: 'An error occurred while creating the appointment.' }, { status: 500 });
	}
}