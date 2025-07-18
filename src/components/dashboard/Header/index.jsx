import { UserNav } from "../UserNav";

export default function Header({ user }) {
	return (
		<header className="sticky top-0 z-10 bg-white border-b">
			<div className="flex items-center justify-end h-16 px-4 sm:px-6 lg:px-8">
				{/* Header content can go here, like search bars or notifications */}
				<div className="flex items-center space-x-4">
					<UserNav user={user} />
				</div>
			</div>
		</header>
	);
}