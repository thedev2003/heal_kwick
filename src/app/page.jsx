import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<div className="flex flex-col items-center p-8 space-y-6 bg-card rounded-lg shadow-lg border">
				<div className="flex items-center text-primary">
					<Stethoscope className="w-16 h-16" />
					<h1 className="ml-4 text-5xl font-bold">Heal Kwick</h1>
				</div>
				<p className="text-lg text-muted-foreground">
					Your modern solution for health and appointment management.
				</p>
				<div className="flex space-x-4">
					<Button asChild>
						<Link href="/login">Login</Link>
					</Button>
					<Button asChild variant="secondary">
						<Link href="/register">Register</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}