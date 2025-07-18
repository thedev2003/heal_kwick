import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/user';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		await connectDB();

		const patients = await User.find({ role: 'patient' }).select('-password').sort({ createdAt: -1 });

		return NextResponse.json(patients, { status: 200 });
	} catch (error) {
		console.error('Failed to fetch patients:', error);
		return NextResponse.json({ message: 'An error occurred while fetching patients.' }, { status: 500 });
	}
}