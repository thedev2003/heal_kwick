// This is a Server Component, so it can be async and fetch data directly.
export default async function AdminDashboardPage() {
	// In a real app, you would fetch stats here.
	// For example: const stats = await getDashboardStats();

	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Admin Overview</h1>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{/* Placeholder Stat Cards - We will make these reusable components later */}
				<div className="p-6 bg-white rounded-lg shadow-md">
					<h3 className="text-lg font-semibold">Total Patients</h3>
					<p className="text-4xl font-bold">128</p>
				</div>
				<div className="p-6 bg-white rounded-lg shadow-md">
					<h3 className="text-lg font-semibold">Appointments Today</h3>
					<p className="text-4xl font-bold">12</p>
				</div>
				<div className="p-6 bg-white rounded-lg shadow-md">
					<h3 className="text-lg font-semibold">Pending Approvals</h3>
					<p className="text-4xl font-bold">3</p>
				</div>
			</div>
		</div>
	);
}