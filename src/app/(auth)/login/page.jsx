import { LoginForm } from '@/components/auth/LoginForm';
import AuthLayout from '@/components/layout/AuthLayout';
import Link from 'next/link';

export default function LoginPage() {
	return (
		<AuthLayout>
			<div className="text-center">
				<h1 className="text-2xl font-bold">Welcome Back</h1>
				<p className="text-gray-500">
					Don&apos;t have an account?{' '}
					<Link href="/register" className="text-blue-500 hover:underline">
						Sign up
					</Link>
				</p>
			</div>
			<LoginForm />
		</AuthLayout>
	);
}