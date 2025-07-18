// This file defines the columns for the Patient data table.
// It's kept separate to allow the DataTable to be reusable.

export const patientColumns = [
	{
		header: 'Name',
		accessorKey: 'name',
	},
	{
		header: 'Email',
		accessorKey: 'email',
	},
	{
		header: 'Phone',
		accessorKey: 'phone',
	},
	{
		header: 'Registration Date',
		accessorKey: 'createdAt',
		// In a real app, you could add a `cell` function here
		// to format the date nicely, e.g., new Date(value).toLocaleDateString()
	},
];