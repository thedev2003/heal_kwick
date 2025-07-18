import { DataTable } from '@/components/table/DataTable';
import { patientColumns } from '@/components/table/columns';
import User from '@/lib/db/models/user';
import connectDB from '@/lib/db/connect';

// This server component fetches the data directly.
async function getPatients() {
	try {
		await connectDB();
		const patients = await User.find({ role: 'patient' }).select('-password').sort({ createdAt: -1 }).lean();
		// Use .lean() for performance and to get plain JS objects
		return JSON.parse(JSON.stringify(patients)); // Serialize for the client component
	} catch (error) {
		console.error("Failed to fetch patients for page:", error);
		return [];
	}
}

export default async function ManagePatientsPage() {
	const patients = await getPatients();

	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Manage Patients</h1>
			<DataTable columns={patientColumns} data={patients} />
		</div>
	);
}