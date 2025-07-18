import { LoginForm } from '@/components/auth/LoginForm';
import AuthLayout from '@/components/layout/AuthLayout';
import { CardFooter } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
	return (
		<AuthLayout>
			<LoginForm />
			<CardFooter className="justify-center">
				<p className="text-sm text-center text-muted-foreground">
					Don&apos;t have an account?{' '}
					<Link href="/register" className="font-medium text-primary hover:underline">
						Sign up
					</Link>
				</p>
			</CardFooter>
		</AuthLayout>
	);
}