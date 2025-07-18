'use client';

export function DataTable({ columns, data }) {
	if (!data || data.length === 0) {
		return <p>No data available.</p>;
	}

	return (
		<div className="overflow-x-auto bg-white rounded-lg shadow">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						{columns.map((column) => (
							<th
								key={column.header}
								scope="col"
								className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.map((row) => (
						<tr key={row._id}>
							{columns.map((column) => (
								<td key={column.header} className="px-6 py-4 whitespace-nowrap">
									{/* LOGIC CHANGE: Check for a custom cell renderer */}
									{column.cell ? (
										column.cell({ row })
									) : (
										<div className="text-sm text-gray-900">{row[column.accessorKey]}</div>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}