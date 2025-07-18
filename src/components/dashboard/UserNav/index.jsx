'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function UserNav({ user }) {
	const router = useRouter();

	const handleLogout = async () => {
		const res = await fetch('/api/auth/logout', { method: 'POST' });
		if (res.ok) {
			router.push('/login');
		} else {
			alert('Logout failed. Please try again.');
		}
	};

	// Get initials for Avatar Fallback
	const getInitials = (name) => {
		if (!name) return 'U';
		const names = name.split(' ');
		return names.map(n => n[0]).join('').toUpperCase();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative w-8 h-8 rounded-full">
					<Avatar className="w-8 h-8">
						{/* In a real app, you might have user.avatarUrl */}
						<AvatarImage src="" alt={user?.name || ''} />
						<AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user?.email || 'No email'}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}