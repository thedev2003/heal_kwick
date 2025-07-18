'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			if (res.ok) {
				router.push('/admin'); // Redirect to a protected dashboard page
				router.refresh(); // Refresh to update server-side auth state
			} else {
				const data = await res.json();
				setError(data.message || 'Login failed.');
			}
		} catch (err) {
			setError('An unexpected error occurred.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{/* We will replace these with shadcn/ui components later */}
			<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />
			<button type="submit" disabled={isLoading} className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400">
				{isLoading ? 'Logging In...' : 'Login'}
			</button>
			{error && <p className="text-sm text-center text-red-500">{error}</p>}
		</form>
	);
}