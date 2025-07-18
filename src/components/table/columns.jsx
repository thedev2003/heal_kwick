'use client';

// Patient columns definition (unchanged)
export const patientColumns = [
	//...
];

// New Appointment columns definition
export const appointmentColumns = [
	{
		header: 'Patient Name',
		accessorKey: 'patient.name', // Access nested data from the populated field
	},
	{
		header: 'Reason',
		accessorKey: 'reason',
	},
	{
		header: 'Scheduled Date',
		accessorKey: 'schedule',
		cell: ({ row }) => new Date(row.original.schedule).toLocaleString(), // Custom cell renderer for formatting
	},
	{
		header: 'Status',
		accessorKey: 'status',
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