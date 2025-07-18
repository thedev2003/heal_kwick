'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Calendar, Stethoscope } from 'lucide-react';

const navItems = [
	{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
	{ href: '/admin/patients', label: 'Manage Patients', icon: Users },
	{ href: '/admin/appointments', label: 'Manage Appointments', icon: Calendar },
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="hidden h-screen border-r md:block w-72">
			<div className="flex flex-col h-full">
				<div className="flex items-center h-16 px-6 border-b">
					<Stethoscope className="w-8 h-8 text-primary" />
					<h2 className="ml-3 text-2xl font-bold text-primary">Heal Kwick</h2>
				</div>
				<nav className="flex-1 p-4 space-y-2">
					{navItems.map((item) => (
						<Button
							key={item.label}
							asChild
							variant={pathname === item.href ? 'secondary' : 'ghost'}
							className="justify-start w-full"
						>
							<Link href={item.href}>
								<item.icon className="w-4 h-4 mr-2" />
								{item.label}
							</Link>
						</Button>
					))}
				</nav>
			</div>
		</aside>
	);
}