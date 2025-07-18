'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password, phone }),
			});

			if (res.ok) {
				router.push('/login');
			} else {
				const data = await res.json();
				setError(data.message || 'Registration failed.');
			}
		} catch (err) {
			setError('An unexpected error occurred.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create an Account</CardTitle>
				<CardDescription>Enter your details below to register.</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Full Name</Label>
						<Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone">Phone (Optional)</Label>
						<Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
					</div>
					<Button type="submit" disabled={isLoading} className="w-full">
						{isLoading ? 'Registering...' : 'Create Account'}
					</Button>
					{error && <p className="text-sm text-center text-destructive">{error}</p>}
				</form>
			</CardContent>
		</Card>
	);
}