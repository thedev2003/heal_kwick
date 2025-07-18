'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function DataTable({ columns, data, title }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title || "Data"}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="border rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								{columns.map((column) => (
									<TableHead key={column.header}>{column.header}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{data && data.length > 0 ? (
								data.map((row) => (
									<TableRow key={row._id}>
										{columns.map((column) => (
											<TableCell key={column.header}>
												{column.cell
													? column.cell({ row })
													: row[column.accessorKey]}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className="h-24 text-center">
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}