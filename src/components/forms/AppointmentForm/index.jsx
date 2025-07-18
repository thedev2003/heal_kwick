'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AppointmentForm() {
	const [formData, setFormData] = useState({
		primaryPhysician: '',
		schedule: '',
		reason: '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		setSuccess('');

		try {
			const res = await fetch('/api/appointments', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (res.ok) {
				setSuccess('Appointment requested successfully!');
				router.refresh(); // Refresh to show new appointment in a list (which we'll build later)
			} else {
				const data = await res.json();
				setError(data.message || 'Failed to request appointment.');
			}
		} catch (err) {
			setError('An unexpected error occurred.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow-md">
			{/* We will replace these with shadcn/ui components later */}
			<input type="text" name="primaryPhysician" placeholder="Preferred Physician" onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
			<input type="datetime-local" name="schedule" onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
			<textarea name="reason" placeholder="Reason for your visit" onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />

			<button type="submit" disabled={isLoading} className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-400">
				{isLoading ? 'Submitting...' : 'Request Appointment'}
			</button>

			{error && <p className="text-sm text-center text-red-500">{error}</p>}
			{success && <p className="text-sm text-center text-green-500">{success}</p>}
		</form>
	);
}