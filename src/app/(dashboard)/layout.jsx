import DashboardLayout from '@/components/layout/DashboardLayout';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/jwt';
import User from '@/lib/db/models/user';
import connectDB from '@/lib/db/connect';

// This function securely fetches user data on the server
async function getUser() {
	const token = cookies().get('token')?.value;
	if (!token) return null;

	const decoded = verifyToken(token);
	if (!decoded) return null;

	try {
		await connectDB();
		const user = await User.findById(decoded.id).select('-password').lean();
		// Use .lean() for better performance as we're just reading data
		// Mongoose returns a full document, lean returns a plain JS object
		return JSON.parse(JSON.stringify(user)); // Serialize for the client component
	} catch (error) {
		console.error('Failed to fetch user:', error);
		return null;
	}
}

export default async function Layout({ children }) {
	const user = await getUser();

	return <DashboardLayout user={user}>{children}</DashboardLayout>;
}