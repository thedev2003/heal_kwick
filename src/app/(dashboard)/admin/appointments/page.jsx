import { DataTable } from '@/components/table/DataTable';
import { appointmentColumns } from '@/components/table/columns';
import Appointment from '@/lib/db/models/appointment';
import connectDB from '@/lib/db/connect';

async function getAppointments() {
	try {
		await connectDB();
		const appointments = await Appointment.find({})
			.populate('patient', 'name email')
			.sort({ schedule: -1 })
			.lean();
		return JSON.parse(JSON.stringify(appointments));
	} catch (error) {
		console.error("Failed to fetch appointments:", error);
		return [];
	}
}

export default async function ManageAppointmentsPage() {
	const appointments = await getAppointments();

	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Manage Appointments</h1>
			<DataTable columns={appointmentColumns} data={appointments} />
		</div>
	);
}