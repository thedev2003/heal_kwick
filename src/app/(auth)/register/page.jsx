import { RegisterForm } from '@/components/auth/RegisterForm';
import AuthLayout from '@/components/layout/AuthLayout';
import { CardFooter } from '@/components/ui/card';
import Link from 'next/link';

export default function RegisterPage() {
	return (
		<AuthLayout>
			<RegisterForm />
			<CardFooter className="justify-center">
				<p className="text-sm text-center text-muted-foreground">
					Already have an account?{' '}
					<Link href="/login" className="font-medium text-primary hover:underline">
						Log in
					</Link>
				</p>
			</CardFooter>
		</AuthLayout>
	);
}