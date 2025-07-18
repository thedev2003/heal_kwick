'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AppointmentActions({ appointment }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleUpdateStatus = async (status) => {
		if (isLoading) return;
		setIsLoading(true);

		try {
			const res = await fetch(`/api/appointments/${appointment._id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status }),
			});

			if (res.ok) {
				// Refresh the page to show the updated status in the table
				router.refresh();
			} else {
				alert(`Failed to update status to ${status}`);
			}
		} catch (error) {
			console.error('Failed to update appointment status:', error);
			alert('An unexpected error occurred.');
		} finally {
			setIsLoading(false);
		}
	};

	// Only show actions for pending appointments
	if (appointment.status !== 'pending') {
		return <span className="text-sm text-gray-500 capitalize">{appointment.status}</span>;
	}

	return (
		<div className="flex items-center space-x-2">
			<button
				onClick={() => handleUpdateStatus('scheduled')}
				disabled={isLoading}
				className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-400"
			>
				Approve
			</button>
			<button
				onClick={() => handleUpdateStatus('cancelled')}
				disabled={isLoading}
				className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-gray-400"
			>
				Cancel
			</button>
		</div>
	);
}