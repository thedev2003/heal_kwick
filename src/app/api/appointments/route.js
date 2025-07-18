import connectDB from '@/lib/db/connect';
import Appointment from '@/lib/db/models/appointment';
import User from '@/lib/db/models/user';
import { sendSms } from '@/lib/utils';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
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