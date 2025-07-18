import { RegisterForm } from '@/components/auth/RegisterForm';
import AuthLayout from '@/components/layout/AuthLayout';
import Link from 'next/link';

export default function RegisterPage() {
	return (
		<AuthLayout>
			<div className="text-center">
				<h1 className="text-2xl font-bold">Create an Account</h1>
				<p className="text-gray-500">
					Already have an account?{' '}
					<Link href="/login" className="text-blue-500 hover:underline">
						Log in
					</Link>
				</p>
			</div>
			<RegisterForm />
		</AuthLayout>
	);
}