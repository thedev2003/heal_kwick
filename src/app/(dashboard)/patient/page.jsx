import { DataTable } from '@/components/table/DataTable';
import { patientAppointmentColumns } from '@/components/table/columns';
import connectDB from '@/lib/db/connect';
import Appointment from '@/lib/db/models/appointment';
import { headers } from 'next/headers';
import Link from 'next/link';

async function getMyAppointments() {
	const headersList = headers();
	const userId = headersList.get('x-user-id');
	if (!userId) return [];

	try {
		await connectDB();
		const appointments = await Appointment.find({ patient: userId })
			.sort({ schedule: -1 })
			.lean();
		return JSON.parse(JSON.stringify(appointments));
	} catch (error) {
		console.error("Failed to fetch patient's appointments:", error);
		return [];
	}
}

export default async function PatientDashboardPage() {
	const myAppointments = await getMyAppointments();

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold">Patient Dashboard</h1>
				<Link href="/patient/appointments" className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">
					Book a New Appointment
				</Link>
			</div>

			<h2 className="mb-4 text-2xl font-semibold">My Appointments</h2>
			<DataTable columns={patientAppointmentColumns} data={myAppointments} />
		</div>
	);
}