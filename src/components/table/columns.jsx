'use client';

// Patient columns definition (unchanged)
export const patientColumns = [
	//...
];

export const appointmentColumns = [
	{
		header: 'Patient Name',
		accessorKey: 'patient.name',
	},
	{
		header: 'Reason',
		accessorKey: 'reason',
	},
	{
		header: 'Scheduled Date',
		accessorKey: 'schedule',
		cell: ({ row }) => new Date(row.original.schedule).toLocaleString(),
	},
	{
		header: 'Status',
		accessorKey: 'status',
	},
	{
		header: 'Actions',
		// We define a custom cell renderer for this column
		cell: ({ row }) => <AppointmentActions appointment={row.original} />,
	},
];

// A simpler column set for when a patient views their own appointments
export const patientAppointmentColumns = [
	{
		header: 'Reason',
		accessorKey: 'reason',
	},
	{
		header: 'Physician',
		accessorKey: 'primaryPhysician',
	},
	{
		header: 'Scheduled Date',
		accessorKey: 'schedule',
		cell: ({ row }) => new Date(row.original.schedule).toLocaleString(),
	},
	{
		header: 'Status',
		accessorKey: 'status',
	},
];