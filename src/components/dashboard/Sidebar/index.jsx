import Link from 'next/link';

// A simple placeholder for the sidebar with navigation links
export default function Sidebar() {
	return (
		<aside className="w-64 h-screen p-4 text-white bg-gray-800">
			<h2 className="mb-8 text-2xl font-bold">Heal Kwick</h2>
			<nav>
				<ul>
					<li className="mb-4">
						<Link href="/admin" className="hover:text-blue-300">
							Dashboard
						</Link>
					</li>
					<li className="mb-4">
						<Link href="/admin/patients" className="hover:text-blue-300">
							Manage Patients
						</Link>
					</li>
					{/* Add more links as needed */}
				</ul>
			</nav>
		</aside>
	);
}