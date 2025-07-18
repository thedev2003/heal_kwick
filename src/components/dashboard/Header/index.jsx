// A simple placeholder for the header
export default function Header({ user }) {
	return (
		<header className="flex items-center justify-between p-4 bg-white border-b">
			<div>
				<h1 className="text-xl font-bold">Dashboard</h1>
			</div>
			<div>
				<p>Welcome, {user?.name || 'User'}</p>
			</div>
		</header>
	);
}