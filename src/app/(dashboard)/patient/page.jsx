import Link from 'next/link';

export default function PatientDashboardPage() {
	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Patient Dashboard</h1>
			<p className="mb-4">Welcome to your personal health dashboard.</p>
			<Link href="/patient/appointments" className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">
				Book a New Appointment
			</Link>
			{/* We will list existing appointments here in the next step */}
		</div>
	);
}