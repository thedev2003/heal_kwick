import connectDB from '@/lib/db/connect';
import Appointment from '@/lib/db/models/appointment';
import { sendSms } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
	try {
		await connectDB();
		const { id } = params;
		const { status } = await request.json();

		if (!status || !['scheduled', 'cancelled'].includes(status)) {
			return NextResponse.json({ message: 'Invalid status provided.' }, { status: 400 });
		}

		const updatedAppointment = await Appointment.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		).populate('patient', 'name phone');

		if (!updatedAppointment) {
			return NextResponse.json({ message: 'Appointment not found.' }, { status: 404 });
		}

		// Send notification upon status change
		const patient = updatedAppointment.patient;
		if (patient && patient.phone) {
			const messageBody = `Hi ${patient.name}, the status of your appointment for ${new Date(updatedAppointment.schedule).toLocaleDateString()} has been updated to: ${status.toUpperCase()}.`;
			await sendSms(patient.phone, messageBody);
		}

		return NextResponse.json(updatedAppointment, { status: 200 });
	} catch (error) {
		console.error('Failed to update appointment:', error);
		return NextResponse.json({ message: 'An error occurred while updating the appointment.' }, { status: 500 });
	}
}